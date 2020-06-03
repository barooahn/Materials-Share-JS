import { SaveData } from "../../actions/materials-share-actions";

const type = "Edit";

const save = (likes, materialId, setCompleted, setSaved) => {
  SaveData(
    {
      likes: likes,
      id: materialId,
    },
    type,
    setCompleted,
    setSaved
  );
};

const ToggleLike = (
  userId,
  likes,
  setLikes,
  materialId,
  setCompleted,
  setSaved
) => {
  //check if userId is in the likes array on material
  if (likes.length > 0) {
    likes.forEach((user) => {
      if (user === userId) {
        const newLikes = likes.filter((id) => id !== userId);
        setLikes(newLikes);
        save(newLikes, materialId, setCompleted, setSaved);
      } else {
        setLikes([...likes, userId]);
        save([...likes, userId], materialId, setCompleted, setSaved);
      }
    });
  } else {
    setLikes([...likes, userId]);
    save([...likes, userId], materialId, setCompleted, setSaved);
  }
};

export default ToggleLike;
