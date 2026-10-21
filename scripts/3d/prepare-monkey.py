"""Blender source pipeline: normalize Modly mesh, project the supplied reference,
rig a seated idle, and export a compact animated GLB. Run with Blender --background.
Raw Modly exports remain outside the repository.
"""
import bpy, math, os, sys
from mathutils import Vector
args = sys.argv[sys.argv.index('--') + 1:]
source, reference, destination = args[:3]
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.gltf(filepath=source)
meshes = [o for o in bpy.context.scene.objects if o.type == 'MESH']
bpy.ops.object.select_all(action='DESELECT')
for obj in meshes: obj.select_set(True)
bpy.context.view_layer.objects.active = meshes[0]
bpy.ops.object.join()
obj = bpy.context.object
obj.name = 'UNDR_Monkey'
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
verts = [v.co for v in obj.data.vertices]
lo = Vector([min(v[i] for v in verts) for i in range(3)])
hi = Vector([max(v[i] for v in verts) for i in range(3)])
print('SOURCE_BOUNDS', list(lo), list(hi), 'FACES',len(obj.data.polygons))
center = Vector(((lo.x+hi.x)/2,(lo.y+hi.y)/2,lo.z))
scale = 2.1/(hi.z-lo.z)
for vertex in obj.data.vertices: vertex.co = (vertex.co-center)*scale
if len(obj.data.polygons)>55000:
    mod=obj.modifiers.new('Web budget','DECIMATE')
    mod.ratio=55000/len(obj.data.polygons)
    bpy.ops.object.modifier_apply(modifier=mod.name)
for polygon in obj.data.polygons: polygon.use_smooth=True
verts=[v.co for v in obj.data.vertices]
lo=Vector([min(v[i] for v in verts) for i in range(3)])
hi=Vector([max(v[i] for v in verts) for i in range(3)])
# Hunyuan exports +Z toward the image; glTF import maps that to Blender -Y.
uv=obj.data.uv_layers.new(name='ReferenceProjection')
for poly in obj.data.polygons:
    for li in poly.loop_indices:
        p=obj.data.vertices[obj.data.loops[li].vertex_index].co
        uv.data[li].uv=(.03+(p.x-lo.x)/(hi.x-lo.x)*.94, .04+(p.z-lo.z)/(hi.z-lo.z)*.91)
mat=bpy.data.materials.new('Dirty_Rodman_Reference')
mat.use_nodes=True
nodes=mat.node_tree.nodes; links=mat.node_tree.links
shader=nodes.get('Principled BSDF'); shader.inputs['Roughness'].default_value=.86
image=nodes.new('ShaderNodeTexImage'); image.image=bpy.data.images.load(reference)
image.image.pack(); links.new(image.outputs['Color'],shader.inputs['Base Color'])
back=bpy.data.materials.new('Black_Hoodie_Back');back.diffuse_color=(.014,.016,.019,1)
back.use_nodes=True;back.node_tree.nodes.get('Principled BSDF').inputs['Base Color'].default_value=(.014,.016,.019,1)
back.node_tree.nodes.get('Principled BSDF').inputs['Roughness'].default_value=.9
obj.data.materials.clear();obj.data.materials.append(mat);obj.data.materials.append(back)
for poly in obj.data.polygons: poly.material_index=0 if poly.normal.y < -.12 else 1
# Soft torso/head weights keep the crossed legs planted.
arm=bpy.data.armatures.new('UNDR_Seated_Rig');rig=bpy.data.objects.new('UNDR_Seated_Rig',arm)
bpy.context.collection.objects.link(rig);bpy.context.view_layer.objects.active=rig
bpy.ops.object.mode_set(mode='EDIT')
base=arm.edit_bones.new('Seated');base.head=(0,0,0);base.tail=(0,0,.55)
torso=arm.edit_bones.new('Torso');torso.head=(0,0,.55);torso.tail=(0,0,1.45);torso.parent=base
head=arm.edit_bones.new('Head');head.head=(0,0,1.45);head.tail=(0,0,2.1);head.parent=torso
bpy.ops.object.mode_set(mode='OBJECT')
groups={name:obj.vertex_groups.new(name=name) for name in ['Seated','Torso','Head']}
for v in obj.data.vertices:
    upper=max(0,min(1,(v.co.z-.42)/.5));headweight=max(0,min(1,(v.co.z-1.35)/.3))
    for name,w in [('Seated',1-upper),('Torso',upper*(1-headweight)),('Head',headweight)]:
        if w>0:groups[name].add([v.index],w,'REPLACE')
mod=obj.modifiers.new('Seated performance','ARMATURE');mod.object=rig;obj.parent=rig
bpy.context.scene.render.fps=24
rig.animation_data_create()
for name,seconds,amplitude in [('Excited_Rocking',4,.055),('Quiet_Breathing',6,.015),('Curious_Head_Tilt',5,.025)]:
    action=bpy.data.actions.new(name);rig.animation_data.action=action
    for frame in range(0,seconds*24+1,3):
        t=frame/(seconds*24)*math.tau
        for b in rig.pose.bones:b.rotation_mode='XYZ';b.rotation_euler=(0,0,0)
        rig.pose.bones['Torso'].rotation_euler.x=math.sin(t*2)*amplitude
        rig.pose.bones['Head'].rotation_euler.x=math.sin(t*2+.3)*amplitude*.7
        if name=='Curious_Head_Tilt':rig.pose.bones['Head'].rotation_euler.y=math.sin(t)*.1
        for bone in ['Torso','Head']:rig.pose.bones[bone].keyframe_insert('rotation_euler',frame=frame)
    track=rig.animation_data.nla_tracks.new();track.name=name
    strip=track.strips.new(name,0,action)
rig.animation_data.action=None
bpy.context.scene.frame_set(0)
bpy.ops.wm.save_as_mainfile(filepath=os.path.splitext(destination)[0]+'.blend')
bpy.ops.object.select_all(action='DESELECT');obj.select_set(True);rig.select_set(True)
bpy.ops.export_scene.gltf(filepath=destination,export_format='GLB',use_selection=True,export_animations=True,export_animation_mode='NLA_TRACKS',export_image_format='JPEG',export_jpeg_quality=88)
print('WEB_MODEL',destination,'FACES',len(obj.data.polygons))
