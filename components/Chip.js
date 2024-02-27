// Used Shadcn for the Badge component
import { Badge } from "@/components/ui/badge";

function Chip({ name, email, onDelete }) {
  const handleDelete = () => {
    onDelete();
  };
  return (
    <div>
      <Badge  className="bg-slate-700">
        <span className="pr-2">
          {name} {email}
        </span>
        <button
          onClick={handleDelete}
          className="text-md font-semibold  border-back border rounded-full w-[20px] "
        >
       
          &times;
        </button>
      </Badge>
    </div>
  );
}

export default Chip;
