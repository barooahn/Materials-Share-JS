import { SaveData } from "../../actions/materials-share-actions";

const type = "Edit";

const save = (likes, materialId) => {
  SaveData(
    {
      likes: likes,
      id: materialId
    },
    type
  );
};

const ToggleLike = (userId, likes, setLikes, materialId) => {
  //check if userId is in the likes array on material
  if (likes.length > 0) {
    likes.forEach(user => {
      if (user === userId) {
        const newLikes = likes.filter(id => id !== userId);
        setLikes(newLikes);
        save(newLikes, materialId);
      } else {
        setLikes([...likes, userId]);
        save([...likes, userId], materialId);
      }
    });
  } else {
    setLikes([...likes, userId]);
    save([...likes, userId], materialId);
  }
};

export default ToggleLike;
