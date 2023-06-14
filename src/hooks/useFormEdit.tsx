import { useState } from "react";

const useFormEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);
  return {
    isEditing,
    startEditing,
    stopEditing,
  };
};

export default useFormEdit;
