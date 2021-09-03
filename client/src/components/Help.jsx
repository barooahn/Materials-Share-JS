import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import ContactForm from "./ContactForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 1),
  },

  paper: {
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Help = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography align="center" variant="h4" component="h1">
        How to use Materials Share
      </Typography>
      <br />
      <br />
      
      <ContactForm />

      <Grid container spacing={0}>
        <Button
          variant="contained"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}>
          Help Topics
        </Button>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#quickstart">
              Quick Start
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#menubar">
              Menu bar
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#viewmaterial">
              View a Material
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#search">
              Search
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#filter">
              Filter
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#register">
              Register
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#login">
              Login/Logout
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#privatepublic">
              Private Public Materials
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#likematerial">
              Like Material
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#savematerial">
              Save Material
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#downloadmaterial">
              Download Material
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#mymaterials">
              My Materials
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#creatematerial">
              Create Material
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#editmaterial">
              Edit Material
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link color="inherit" href="#printmaterial">
              Print Material
            </Link>
          </MenuItem>
        </Menu>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="quickstart">
              Quick Start
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              The first thing to do to have full access to the site is
              <Link href="#register"> Register</Link>.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              After registering and verifying your email address, you should be
              logged in, if not,<Link href="#login">Login</Link>.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              Now you can browse <Link href="#materials">Materials</Link>,
              <Link href="#downloadmaterial">Download Materials</Link>,
              <Link href="#likematerial">Like Materials</Link> and
              <Link href="#savematerial">Save Materials</Link>
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              If you want to find materials quickly you can
              <Link href="#search">Search</Link> or
              <Link href="#filter">Filter</Link>
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              Remember to hit the title or image of the material you are
              interested in to
              <Link href="#viewmaterial">View a Material</Link> in detail.
            </Typography>
            <Typography variant="body1" className="spacedBodyText">
              You can also <Link href="#creatematerial">Create Materials</Link>{" "}
              and
              <Link href="#editmaterial">Edit your Materials</Link>
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              This should get you going. If you want more details check the
              index above
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="menubar">
              Menu bar
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              The menu bar is located at the top of the screen. It looks
              different on mobile and is not visible to begin with.
            </Typography>
            <Typography variant="body1" className="spacedBodyText">
              On mobile you have to hit the icon in the top right hand corner
              with three bars on it to open the menu. See the pictures for both
              desktop and mobile menu bars.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              The menu is like a navigation panel. It allows you to see
              different areas of <em>Materials Share</em>. You are now in the
              <b> Start Here </b>
              area. Have a look at the other areas you can visit. We will take a
              look at each in more detail below.
            </Typography>
            <Typography variant="body1" className="spacedBodyText">
              Hit any menu item to go to that page.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="materials">
              Materials
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              The <b> Materials </b> page is where you view all materials
              created and currently shared.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              The <b> Materials </b> page gives you brief information about each
              material, such as: title, objective, level, the textbook it can be
              used with, and a picture of files associated with the material.
              Hit any material to get the full details.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="viewmaterial">
              View a Material
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              By hitting <b> Materials </b> on the menu bar, you will get a list
              of all the materials currently available on the site. If you want
              more detail on a particular material, click on its title. This
              will bring you into the <b> Materials </b> page. From here you
              have many options.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              - If you are not logged in you can browse the material.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              If you are logged in:
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              - (and you own the material), you can edit or delete the material
              by clicking the appropriate button. You can also make the material
              public or private.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              - If you are not the owner of the material, you can save the
              material in your <b> My Materials </b> page by hitting save. You
              can download the files that accompany the material. You can also
              rate and leave comments about the material.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="search">
              Search
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              A <b> Search </b> function aids finding a material specific to
              your needs. Just type in a word such as family and Materials Share
              will search its database for materials containing the key word.
              Search is located on the menu bar. Just type a relevant word and
              hit enter. All the materials pertinent to the search query will be
              displayed.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="filter">
              Filter
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              <b> Filter </b> reduces the number of materials to meet your
              needs, but filter reduces by a number of factors at once. Say you
              want a material for Level 2, which lasts 10 minutes and involves
              speaking, then you can set these filters and only find materials
              with these attributes. The filter button is located at the top on
              the <b> Materials page </b>. Click it to see the filter criteria.
              Choose your criteria and hit the Start filter button to see your
              selection.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="register">
              Register
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              <b> Registering </b> is free and gives you many benefits.
              Registered users can: upload, edit, download, and save new
              materials to their <b> My Materials </b> page and rate and comment
              on materials. Registering is easy. Click on Register on the menu
              bar. You will be taken to a form. Fill out all the details
              requested. Please use a strong password - one with numbers letters
              and characters longer than 8 characters is a good password. Click
              the submit button. You should see a new page asking you to check
              the email address you have registered with. Please check for an
              email from Materials Share. The email should contain a link. Hit
              the link to activate your account. You should now see your
              <b> My Materials </b> page. You are now logged in.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="login">
              Login/Logout
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              To <b> login </b> or logout, simply click on the appropriate
              button in the menu bar. Login will require that you are registered
              and ask for the email address and password you chose when you
              registered. When you login, you will be taken to your
              <b> My Materials </b> page.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="privatepublic">
              Shared Materials
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              All materials can be shared or not. Materials shared status can
              only be changed by their creator/owner. Making a material shared
              means it can be viewed, searched for, filtered and/or saved in the
              "Materials" page. If the material is made not shared only you, the
              creator of the material can see it in your "My materials" page.
              You may wish to make materials that are not complete not shared.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="likematerial">
              Like Material
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              If you are logged in you are able like a material. To do so, go to
              the either the detailed view of the material you want to rate
              (find material and click on its title), or directly from the
              materials view. Yuo just click on the heart shaped icon to like.
              You can change your mind and de-like by using the same method at
              any time, but can only like a material once. After your like, the
              hearts display the number of likes cast, not just your like.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="savematerial">
              Save Material
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              Materials can be saved to your <b> My Materials </b> page from the
              <b> Materials </b> page or from the detailed view of a material.
              If you are logged in, simply hit the <b> Save to my materials </b>{" "}
              button, or hit the
              <b> Remove from my materials </b>. Once a material is saved, you
              can easily find it again in your <b> My Materials </b> page.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              component="h3"
              href="#"
              id="downloadmaterial">
              Download Material
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              If you are logged in you may <b> download </b> materials. To do
              this, go to the detailed view of a material (click on the title
              from <b> My Materials </b> or <b> Materials </b> pages). In the
              detailed view you will see a download button under the image of
              the attached files. Hit this button to start the download. Please
              note this may take a while depending on your internet connection
              speed and the size of the file. Files downloaded are at original
              file size, not reduced as you see on the preview.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="mymaterials">
              My Materials
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              <b> My Materials </b> is your home page. It is where all the
              materials you have created are stored. It can only be accessed by
              you, the owner, when you are logged in. Materials that are private
              can be worked on from here. Materials can be made public (or
              private) from here too. All your saved materials will be here.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography
              variant="h5"
              component="h3"
              href="#"
              id="creatematerial">
              Create Material
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              To <b>create </b> a material you must be logged in. Creating a
              material is a two stage process. The first stage is to choose the
              attributes your material requires.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              Choosing attributes - To create a new material, hit the [+] or{" "}
              <b> New Material </b> button. A new screen will lead with a number
              of buttons. Each button represents a different attribute of your
              material. You may choose as many or as few attributes as you
              require.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              If you are in a rush you may just choose <b> files </b>. You could
              take a quick picture with your phone and give the material a title
              and you would be done. Later you could edit the material and fill
              out more details. Or, as a conscientious uploader, you may choose
              to complete all the fields in one sitting.
            </Typography>
            <Typography variant="body1" className="spacedBodyText">
              *Please note you can edit a material and add attributes to it or
              update it at anytime
            </Typography>
            <Typography variant="body1" className="spacedBodyText">
              The second stage is to provide details about those attributes.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              Stage two: Complete the form - For each button you selected in
              stage one, one of a number of different input type tools will be
              displayed. Please try to complete these as accurately as you can.
              You can always edit them later if you make mistakes. Once all the
              fields are complete, hit the continue button. If there are no
              errors in the form, you will be taken to the <b> My Materials </b>{" "}
              page where you should see your recently created material.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="editmaterial">
              Edit Material
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              To <b> edit </b> a material you will need to be logged in. You
              will need to be in the detailed view or materials view of the
              material. You need to be the creator of the material. Click the{" "}
              <b> Edit </b> button to edit. This will take you to a menu similar
              to when you created the material.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              There are two columns (one on mobile) The first column shows the
              current attributes of the material. To edit them click on the
              button to select the attribute to edit. The right hand column
              (below on mobile) represents available attributed you may want to
              add to your material. Click any attributes you wish to add. Note
              if you click again on the attribute it will deselect.
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              When you have chosen all the attributes you want to add or edit
              click the "continue" button at the bottom of the screen. This will
              take you to the form for making you edits. Once you have completed
              the form click continue to finish. You will be taken back to your
              <b> My Materials </b> page where you will see the edited material.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h3" href="#" id="printmaterial">
              Print Material
            </Typography>

            <Typography variant="body1" className="spacedBodyText">
              If you wish to print any material you can press the print icon in
              the detailed view or press CTRL + P on your keyboard. This will
              open the print service of your browser where you will see a
              modified version of the material designed for print. Follow the
              instructions for printing.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Help;
