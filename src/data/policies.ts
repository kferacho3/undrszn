import { SUPPORT_EMAIL } from "./catalog";

export interface PolicyPreview {
  title: string;
  sections: [string, string][];
  note: string;
}

/**
 * Presentation previews only. Production must render the approved Shopify policy objects;
 * these notes do not replace legal text.
 */
export const policies: Record<string, PolicyPreview> = {
  "shipping-policy": {
    title: "Shipping",
    sections: [
      ["Processing and delivery", "The current page gives approximately 2–5 business days for processing. Delivery time starts separately once a carrier receives the parcel."],
      ["Preorders", "Any preorder or made-to-order schedule must be stated on the product page. The collection’s release and fulfillment status still needs owner confirmation."],
      ["Tracking and address questions", "Use your order’s shipping notification for tracking. Contact the brand with the order number when help is needed."],
    ],
    note: "Layout preview, not a replacement policy. Confirm the fulfillment estimate and remove the drafting note currently published on the live shipping page.",
  },
  "refund-policy": {
    title: "Exchanges",
    sections: [
      ["Before you buy", "The current policy states that sales are final, while certain items can qualify for a size exchange. Do not describe this as free returns."],
      ["Request window", "The published request window is seven days after delivery. Eligibility depends on condition, packaging and size availability."],
      ["Incorrect or damaged item", "Contact the brand promptly with your order number and photographs."],
    ],
    note: "Layout preview, not a replacement policy. The owner must clarify how the general final-sale wording differs from items explicitly excluded from exchange.",
  },
  "privacy-policy": {
    title: "Privacy",
    sections: [
      ["Your information", "The live policy describes how the brand and its service providers handle customer information."],
      ["Choices and requests", "Use the current policy for the full explanation of privacy choices, contact methods, and applicable rights."],
    ],
    note: "The full current policy remains on the live store. This preview does not recreate or modify legal terms. No application or newsletter information is stored by this site.",
  },
  "terms-of-service": {
    title: "Terms of service",
    sections: [
      ["Shopping with UNDR", "The published terms cover orders, availability, product representation, payment and other store conditions."],
      ["The authoritative version", "Review the full current terms on the live store before making a purchase."],
    ],
    note: "Typography and navigation preview only. Full approved terms must be rendered from the existing Shopify policy object in production.",
  },
  "contact-information": {
    title: "Contact information",
    sections: [
      ["Email", `The brand’s current privacy policy publishes ${SUPPORT_EMAIL}. Confirm that this is the intended customer-service address before making it the storewide support contact.`],
      ["Help with an order", "Include your name and order number in a private support message. Do not send card details."],
    ],
    note: "The separate live contact-information page still contains placeholder text. This preview uses the email published elsewhere by the brand, not an invented support address.",
  },
};
