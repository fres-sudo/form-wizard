"use client";

import { MdTextFields } from "react-icons/md";
import { ElementsType, FormELementIstance, FormElement } from "../FormElements";

const type: ElementsType = "TextField";

export const TextFIeldFormElement: FormElement = {
  type,
  deisgnerComponent: () => <div>Deisgner Component</div>,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeHolder: "Value here...",
    },
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
};
