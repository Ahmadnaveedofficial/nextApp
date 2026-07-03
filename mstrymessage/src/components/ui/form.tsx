import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// -----------------------------------------------------------------------------
// Form Provider
// Wraps the entire form and provides React Hook Form context.
// -----------------------------------------------------------------------------
const Form = FormProvider;

// -----------------------------------------------------------------------------
// Form Field Context
// Stores the current field name so child components can access it.
// -----------------------------------------------------------------------------
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

// -----------------------------------------------------------------------------
// FormField
// Wraps React Hook Form's Controller and provides field context.
// -----------------------------------------------------------------------------
const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// Form Item Context
// Stores a unique id for each form field.
// -----------------------------------------------------------------------------
type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

// -----------------------------------------------------------------------------
// useFormField
// Returns all useful information related to the current form field.
// Used internally by FormLabel, FormControl, FormMessage, etc.
// -----------------------------------------------------------------------------
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// -----------------------------------------------------------------------------
// FormItem
// Wrapper around each form field.
// Generates a unique id used by label, input and error message.
// -----------------------------------------------------------------------------
const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});

FormItem.displayName = "FormItem";

// -----------------------------------------------------------------------------
// FormLabel
// Automatically changes color when validation fails.
// -----------------------------------------------------------------------------
const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  );
});

FormLabel.displayName = "FormLabel";

// -----------------------------------------------------------------------------
// FormControl
// Connects the actual input component with accessibility attributes.
// -----------------------------------------------------------------------------
const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-invalid={!!error}
      aria-describedby={
        error
          ? `${formDescriptionId} ${formMessageId}`
          : formDescriptionId
      }
      {...props}
    />
  );
});

FormControl.displayName = "FormControl";

// -----------------------------------------------------------------------------
// FormDescription
// Displays helper text below the input.
// -----------------------------------------------------------------------------
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

FormDescription.displayName = "FormDescription";

// -----------------------------------------------------------------------------
// FormMessage
// Displays validation error message.
// If there is no error, renders children instead.
// -----------------------------------------------------------------------------
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();

  const body = error ? String(error.message) : children;

  if (!body) return null;

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});

FormMessage.displayName = "FormMessage";

// -----------------------------------------------------------------------------
// Export Components
// -----------------------------------------------------------------------------
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};