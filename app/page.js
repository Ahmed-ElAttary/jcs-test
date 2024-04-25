import dynamic from "next/dynamic";
const MapViewComp = dynamic(
  () => import("./components/MapViewComp/MapViewComp"),
  { ssr: false }
);
export default function Home() {
  return <MapViewComp></MapViewComp>;
}
