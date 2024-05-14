import CommandPalette from "./components/CommandPalette/CommandPalette";

interface IApp {
  storage: any
};

export default function App({ storage }: IApp) {
  return <CommandPalette storage={storage} />;
}
