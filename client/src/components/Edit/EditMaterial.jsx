import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from "@material-ui/core/TextField";
import SelectBox from "../SelectBox";

class EditMaterial extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      handleChange,
      handleBookChange,
      handleSelectChange,
      updateMaterial
    } = this.props;

    return (
      <React.Fragment>
        <div>
          <TextField
            id="title"
            label="Title"
            value={this.props.title}
            onChange={handleChange("title")}
            margin="normal"
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <TextField
            id="objective"
            label="Objective of the resource"
            value={this.props.objective}
            placeholder="By the end of the activity pupils will be able to:"
            onChange={handleChange("objective")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <br />
          <br />
          <SelectBox
            name="level"
            label="Level of the resource (Choose or type your own)"
            value={this.props.level}
            handleSelectChange={handleSelectChange}
          />
          <br />
          <br />
        </div>
        <div>
          <TextField
            id="preparation"
            label="Time needed for preparation (slide bar or type - number of minutes)"
            value={this.props.preparation}
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
            value={this.props.preparation}
            onChange={handleChange("preparation")}
            step="1"
          />
          <br />
          <br />
        </div>
        <div>
          <TextField
            id="timeInClass1"
            label="Time needed in class (slide bar or type - number of minutes)"
            value={this.props.timeInClass}
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
            value={this.props.timeInClass}
            onChange={handleChange("timeInClass")}
            step="1"
          />
          <br />
          <br />
        </div>
        <div>
          <SelectBox
            name="pupilTask"
            label="Type of pupil tasks - (Choose or type your own)"
            value={this.props.pupilTask}
            handleSelectChange={handleSelectChange}
          />
          <br />
          <br />
        </div>
        <div>
          <TextField
            id="procedureBefore"
            label="Procedure before class (you can use multiple lines)"
            placeholder="eg. Make one copy of the handout for each pupil."
            value={this.props.procedureBefore}
            onChange={handleChange("procedureBefore")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <br />
        </div>
        <div>
          <TextField
            id="procedureIn"
            label="Procedure in class (you can use multiple lines)"
            value={this.props.procedureIn}
            onChange={handleChange("procedureIn")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <br />
        </div>
        <div>
          <FormHelperText>Is the resource based on a textbook?</FormHelperText>
          <TextField
            id="book"
            label="Text book title"
            value={this.props.book.title}
            onChange={handleBookChange("title")}
            margin="normal"
            style={{ width: "100%" }}
          />
          <TextField
            id="page"
            label="Page of text book"
            value={this.props.book.page}
            onChange={handleBookChange("page")}
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
          <br />
        </div>
        <div>
          <TextField
            id="followUp"
            label="Follow up activities (you can use multiple lines)"
            value={this.props.followUp}
            onChange={handleChange("followUp")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
        </div>
        <div>
          <TextField
            id="variations"
            label="Variations on the material use (you can use multiple lines)"
            placeholder="eg. For weaker students..."
            value={this.props.variations}
            onChange={handleChange("variations")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
        </div>
        <div>
          <TextField
            id="materials"
            label="What materials do I need?"
            placeholder="eg. Finger puppet template, colour pencils, scissors and tape."
            value={this.props.materials}
            onChange={handleChange("materials")}
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
        </div>
        <div>
          <TextField
            id="tips"
            label="tips (you can use multiple lines)"
            value={this.props.tips}
            onChange={handleChange("tips")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
            placeholder="eg. Pupils can use the completed worksheets to make a classroom display "
          />
          <br />
        </div>
        <div>
          <TextField
            id="notes"
            label="notes (you can use multiple lines)"
            value={this.props.notes}
            onChange={handleChange("notes")}
            multiline
            margin="normal"
            style={{ width: "100%" }}
          />
          <br />
        </div>
        <div>
          <SelectBox
            name="category"
            label="What institue is the material for? - School, language center
              etc. (Choose or create your own)"
            value={this.props.category}
            handleSelectChange={handleSelectChange}
          />
          <br />
        </div>
        <div>
          <SelectBox
            name="languageFocus"
            label="What is the language focus of the resource? - Speaking,
              Listening etc. (Choose or create your own)"
            value={this.props.languageFocus}
            handleSelectChange={handleSelectChange}
          />
        </div>
        <div>
          <SelectBox
            name="activityUse"
            label="What is the activity use of the resource? - Production,
              Presenetation etc. (Choose or create your own)"
            value={this.props.activityUse}
            handleSelectChange={handleSelectChange}
          />
        </div>
        <div>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            // className={this.props.classes.button}
            onClick={updateMaterial}
          >
            Save
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default EditMaterial;
