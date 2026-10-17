"use client";

import { useState } from "react";
import { getMemberImage } from "@/data/members";
import { MembersStudy } from "./MembersStudy";

const studies = [
  { id: "cognac-wallet", color: "Cognac", label: "The warm signature.", className: "cognac" },
  { id: "ivory-wallet", color: "Ivory", label: "A quiet impression.", className: "ivory" },
  { id: "scarlet-wallet", color: "Scarlet", label: "A little intensity.", className: "scarlet" },
  { id: "scarlet-tall-wallet", color: "Scarlet / tall", label: "Another perspective.", className: "scarlet-tall" },
];

export function MembersGoods() {
  const [selected, setSelected] = useState(0);
  const study = studies[selected];
  return (
    <div className="members-goods__study">
      <div className="members-goods__picture">
        <MembersStudy key={study.id} image={getMemberImage(study.id)} sizes="(max-width: 760px) 100vw, 48vw" />
        <span className="members-goods__plate" aria-hidden="true">UNDRSZN · SMALL GOODS</span>
      </div>
      <div className="members-goods__controls">
        <div className="members-goods__caption" aria-live="polite" aria-atomic="true">
          <span className="members-label">{study.color}</span>
          <span>{study.label}</span>
        </div>
        <div className="members-swatches" role="group" aria-label="Preview a small-goods study">
          {studies.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`View ${item.color.toLowerCase()} study`}
              aria-pressed={selected === index}
              className={`members-swatch members-swatch--${item.className}`}
              onClick={() => setSelected(index)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
