import { CommandEmpty, CommandList } from "@/components/ui/command";

const CreateView = () => {
  return (
    <CommandList>
      <CommandEmpty>You are creating an issue</CommandEmpty>
    </CommandList>
  );
};

export default CreateView;
