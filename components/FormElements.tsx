import { ElementType } from "react";
import { TextFIeldFormElement } from "./fields/TextField";

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormELementIstance;

  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };
  deisgnerComponent: React.FC;
  formComponent: React.FC;
  propertiesComponent: React.FC;
};

type FormElementsType = {
  [jey in ElementsType]: FormElement;
};

export type FormELementIstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>; //string key and as a value any kind of object
};

export const FormElements: FormElementsType = {
  TextField: TextFIeldFormElement,
};
