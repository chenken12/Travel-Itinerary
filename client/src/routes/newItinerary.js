import CreateItinerary from "../components/CreateItinerary";
import { ToastContainer, toast } from 'react-toastify';

export default function NewItinerary() {
  return (
      <main style={{ padding: "1rem 0" }}>
        <ToastContainer />
        <CreateItinerary toast={toast}/>
      </main>
  );
}