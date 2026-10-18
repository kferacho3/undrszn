import Foundation
import Vision
import CoreImage
import ImageIO
let input = CommandLine.arguments[1]
let output = CommandLine.arguments[2]
let context = CIContext()
for file in try FileManager.default.contentsOfDirectory(atPath: input).sorted() where file.hasSuffix(".png") {
    do {
        let handler = VNImageRequestHandler(url: URL(fileURLWithPath: input + "/" + file))
        let request = VNGenerateForegroundInstanceMaskRequest()
        try handler.perform([request])
        guard let observation = request.results?.first else { print("No mask: \(file)"); continue }
        let mask = try observation.generateScaledMaskForImage(forInstances: observation.allInstances, from: handler)
        let image = CIImage(cvPixelBuffer: mask)
        try context.writePNGRepresentation(of: image, to: URL(fileURLWithPath: output + "/" + file), format: .L8, colorSpace: CGColorSpaceCreateDeviceGray())
        print("Masked: \(file)")
    } catch { print("Failed \(file): \(error)") }
}
