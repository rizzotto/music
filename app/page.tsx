import Player from "./components/player";
import { AppProvider } from "./context/provider";

export default function Home() {
  return (
    <AppProvider>
      <Player />
    </AppProvider>
  );
}
