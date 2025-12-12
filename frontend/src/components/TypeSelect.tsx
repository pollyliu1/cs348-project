import { POKEMON_TYPES } from "@/constants/types";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

type Props = {
  typesSelected: string[];
  onTypesSelect: (types: string[]) => void;
};

const TypeSelect = ({ typesSelected, onTypesSelect }: Props) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="">Select Pokémon Types:</p>
      <CheckboxGroup name="framework">
        {POKEMON_TYPES.map((type) => {
          const isSelected = typesSelected.includes(type);
          return (
            <Checkbox.Root
              _checked={{
                "& .chakra-checkbox__control": { background: "transparent" },
              }}
              className="border-1"
              key={type}
              checked={isSelected}
              onCheckedChange={(checked) => {
                const newTypes = checked.checked
                  ? [...typesSelected, type]
                  : typesSelected.filter((t) => t !== type);
                onTypesSelect(newTypes);
              }}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control className="ring-1 ring-white text-white" />
              <Checkbox.Label>{type}</Checkbox.Label>
            </Checkbox.Root>
          );
        })}
        <Button
          className="flex ring-white ring-1 w-32 justify-self-center mt-4"
          onClick={() => onTypesSelect([])}
        >
          Deselect All
        </Button>
      </CheckboxGroup>
    </div>
  );
};

export default TypeSelect;
