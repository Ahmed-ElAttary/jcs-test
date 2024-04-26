import dynamic from "next/dynamic";
const MapViewComp = dynamic(
  () => import("./components/MapViewComp/MapViewComp"),
  { ssr: false }
);
import EssentialsProvider from "./EssentialsProvider.jsx";
export default function Home() {
  return (
    <EssentialsProvider>
      <MapViewComp></MapViewComp>
    </EssentialsProvider>
  );
}
