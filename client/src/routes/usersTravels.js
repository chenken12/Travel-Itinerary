import NavBar from "../components/navBar";
import UserItineraryData from "../components/UserItineraryData";

export default function UsersTravels() {
  return (
    <main style={{ padding: "1rem 0" }}>
      <UserItineraryData />
    </main>
  );
}

// React context: to store user id and read from context and use the id.