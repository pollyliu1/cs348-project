import { NativeSelect } from "@chakra-ui/react";
import { SortOrders } from "@/constants/sorting";

type Props = {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
};

const SortBy = ({ sortBy, onSortChange }: Props) => {
  return (
    <>
      <p className="px-4 pb-2">Select Pokémon Types:</p>
      <NativeSelect.Root
        size="sm"
        className="mx-4 w-[220px] ring-white ring-solid ring-1 rounded-12"
      >
        <NativeSelect.Field
          value={sortBy}
          onChange={(e) => onSortChange(e.currentTarget.value)}
          className="px-4"
        >
          {SortOrders.map((order) => (
            <option key={order} value={order}>
              {order}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </>
  );
};

export default SortBy;
