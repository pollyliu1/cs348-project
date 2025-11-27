import React from "react";
import { Field, Input, Textarea, Button } from "@chakra-ui/react";

type AdoptionFormProps = {
  handleSubmit: (data: {
    nickname: string;
    name: string;
    description: string;
  }) => void | Promise<void>;
  isUpdate?: boolean;
  onClose?: () => void;
  existingData?: {
    nickname: string;
    name: string;
    description: string;
  };
  onDelete?: () => void;
};

const AdoptionForm = ({
  handleSubmit,
  isUpdate = false,
  onClose,
  existingData,
  onDelete,
}: AdoptionFormProps) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nickname = formData.get("nickname") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    handleSubmit({ nickname, name, description });
    onClose?.();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-2xl font-medium mb-4">
        {isUpdate ? "Update Pokemon Details" : "Add New Pokemon for Adoption"}
      </h1>
      <Field.Root required>
        <Field.Label>
          Nickname <Field.RequiredIndicator />
        </Field.Label>
        <Input
          name="nickname"
          placeholder="Enter nickname"
          border={"2px solid white"}
          paddingInline={"12px"}
          marginBlockEnd={"16px"}
          defaultValue={existingData?.nickname}
        />
      </Field.Root>

      <Field.Root required>
        <Field.Label>
          Pokémon Name <Field.RequiredIndicator />
        </Field.Label>
        <Input
          name="name"
          placeholder="Enter Pokémon name"
          border={"2px solid white"}
          paddingInline={"12px"}
          marginBlockEnd={"16px"}
          defaultValue={existingData?.name}
        />
      </Field.Root>

      <Field.Root required>
        <Field.Label>
          Description <Field.RequiredIndicator />
        </Field.Label>
        <Textarea
          name="description"
          resize="none"
          placeholder="Enter description"
          border={"2px solid white"}
          padding={"12px"}
          marginBlockEnd={"16px"}
          defaultValue={existingData?.description}
        />
      </Field.Root>

      <div className="flex gap-2 justify-center">
        <Button
          type="button"
          className="flex ring-white rounded-12 bg-red-400/50 ring-1 w-28 mr-4 justify-self-center mt-4"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="flex ring-white rounded-12 bg-red-400/50 ring-1 w-28 justify-self-center mt-4"
          onClick={() => onDelete?.()}
        >
          Delete
        </Button>
        <Button
          type="submit"
          className="flex ring-white rounded-12 ring-1 w-40 justify-self-center mt-4"
        >
          {isUpdate ? "Update Pokémon" : "Add Pokémon"}
        </Button>
      </div>
    </form>
  );
};

export default AdoptionForm;
