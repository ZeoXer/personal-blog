import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Input from "../form-fields/input";

const Search = () => {
  return (
    <div>
      <Input
        inputClassName="w-full"
        placeholder="搜尋內容..."
        icon={<MagnifyingGlassIcon className="w-6" />}
      />
    </div>
  );
};

export default Search;
