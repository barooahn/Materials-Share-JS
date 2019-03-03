import React from "react";
import { FormHelperText, TextField } from "@material-ui/core";
import AsyncCreatableSelect from "react-select/lib/AsyncCreatable";
import getInputSelectOptions from "../generalHelpers/helpers";

const MakeEditMaterialComponents = props => {
  const { material, handleChange, handleBookChange } = props;
  return (
    <React.Fragment>
      <propsTextField
        id="objective"
        label="Objective of the resource"
        value={material.objective}
        placeholder="By the end of the activity pupils will be able to:"
        // onChange={handleChange("objective")}
        multiline
        margin="normal"
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <FormHelperText>
        Level of the resource (Choose or type your own)
      </FormHelperText>
      <br />
      <AsyncCreatableSelect
        cacheOptions
        defaultOptions
        isMulti
        name="level"
        loadOptions={() => getInputSelectOptions("level")}
        defaultValue={material.level}
        onChange={this.handleLevelChange}
      />
      <br />
      <br />
      <TextField
        id="preparation"
        label="Time needed for preparation (slide bar or type - number of minutes)"
        value={material.preparation}
        onChange={handleChange("preparation")}
        margin="normal"
        style={{ width: "100%" }}
      />
      <input
        id="preparation"
        className="slider-bar"
        type="range"
        min="0"
        max="60"
        value={material.preparation}
        onChange={handleChange("preparation")}
        step="1"
      />
      <br />
      <br />
      <TextField
        id="timeInClass1"
        label="Time needed in class (slide bar or type - number of minutes)"
        value={material.timeInClass}
        onChange={handleChange("timeInClass")}
        margin="normal"
        style={{ width: "100%" }}
      />
      <input
        id="timeInClass2"
        className="slider-bar"
        type="range"
        min="0"
        max="120"
        value={material.timeInClass}
        onChange={handleChange("timeInClass")}
        step="1"
      />
      <br />
      <br />
      <FormHelperText>
        Type of pupil tasks - (Choose or type your own)
      </FormHelperText>
      <br />
      <AsyncCreatableSelect
        cacheOptions
        defaultOptions
        isMulti
        name="pupilTask"
        defaultValue={material.pupilTask}
        loadOptions={() => getInputSelectOptions("pupilTask")}
        onChange={this.handlePupilTaskChange}
      />
      <br />
      <br />
      <TextField
        id="procedureBefore"
        label="Procedure before class (you can use multiple lines)"
        placeholder="eg. Make one copy of the handout for each pupil."
        value={material.procedureBefore}
        onChange={handleChange("procedureBefore")}
        multiline
        margin="normal"
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <TextField
        id="procedureIn"
        label="Procedure in class (you can use multiple lines)"
        value={material.procedureIn}
        onChange={handleChange("procedureIn")}
        multiline
        margin="normal"
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <FormHelperText>Is the resource based on a textbook?</FormHelperText>
      <TextField
        id="book"
        label="Text book title"
        value={material.book.title}
        onChange={handleBookChange("title")}
        margin="normal"
        style={{ width: "100%" }}
      />
      <TextField
        id="page"
        label="Page of text book"
        value={material.book.page}
        onChange={handleBookChange("page")}
        margin="normal"
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <TextField
        id="followUp"
        label="Follow up activities (you can use multiple lines)"
        value={material.followUp}
        onChange={handleChange("followUp")}
        multiline
        margin="normal"
        style={{ width: "100%" }}
      />
      <br />
      <TextField
        id="variations"
        label="Variations on the material use (you can use multiple lines)"
        placeholder="eg. For weaker students..."
        value={material.variations}
        onChange={handleChange("variations")}
        multiline
        margin="normal"
        style={{ width: "100%" }}
      />
      <br />
      <TextField
        id="materials"
        label="What materials do I need?"
        placeholder="eg. Finger puppet template, colour pencils, scissors and tape."
        value={material.materials}
        onChange={handleChange("materials")}
        margin="normal"
        style={{ width: "100%" }}
      />
      <br />
      <TextField
        id="tips"
        label="tips (you can use multiple lines)"
        value={material.tips}
        onChange={handleChange("tips")}
        multiline
        margin="normal"
        style={{ width: "100%" }}
        placeholder="eg. Pupils can use the completed worksheets to make a classroom display "
      />
      <br />
      <TextField
        id="notes"
        label="notes (you can use multiple lines)"
        value={material.notes}
        onChange={handleChange("notes")}
        multiline
        margin="normal"
        style={{ width: "100%" }}
      />
      <br />
      <FormHelperText>
        What institue is the material for? - School, language center etc.
      </FormHelperText>
      <FormHelperText>(Choose or create your own)</FormHelperText>
      <br />
      <AsyncCreatableSelect
        cacheOptions
        defaultOptions
        name="category"
        isMulti
        defaultValue={material.category}
        loadOptions={() => getInputSelectOptions("category")}
        onChange={this.handleCategoryChange}
      />
      <br />
      <FormHelperText>
        What is the language focus of the resource? - Speaking, Listening etc.
      </FormHelperText>
      <FormHelperText>(Choose or create your own)</FormHelperText>
      <br />
      <AsyncCreatableSelect
        cacheOptions
        defaultOptions
        isMulti
        name="languageFocus"
        defaultValue={material.languageFocus}
        loadOptions={() => getInputSelectOptions("languageFocus")}
        onChange={this.handleLanguageFocusChange}
      />
      <FormHelperText>
        What is the activity use of the resource? - Production, Presenetation
        etc.
      </FormHelperText>
      <FormHelperText>(Choose or create your own)</FormHelperText>
      <br />
      <AsyncCreatableSelect
        cacheOptions
        defaultOptions
        defaultValue={material.activityUse}
        isMulti
        name="activityUse"
        loadOptions={() => getInputSelectOptions("activityUse")}
        onChange={this.handleActivityUseChange}
      />
      <br />
    </React.Fragment>
  );
};

export default MakeEditMaterialComponents;
