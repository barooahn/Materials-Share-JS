import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  OKShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  TumblrShareButton,
  LivejournalShareButton,
  MailruShareButton,
  ViberShareButton,
  WorkplaceShareButton,
  LineShareButton,
  WeiboShareButton,
  PocketShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
} from "react-share";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  child: {
    verticalAlign: "top",
    display: "inline-block",
    marginRight: "10",
    textAlign: "center",
  },
  Demo__container: {
    width: "60",
    height: "100%",
  },
}));

export default ({ handleClose, open, slug }) => {
  const classes = useStyles();

  //settings for slider
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // };

  //this plus slug -- need to make slug ---
  ///////////////////*********** change for live */
  const shareUrl = window.location.href + "/" + slug;
  ///////////////////*********** change for live */
  // console.log("current location ", shareUrl);

  const title = "Materials share - Create and share teaching resources ";

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className="Demo__container">
            {/* <Slider {...settings}> */}
            <div className={classes.child}>
              <FacebookShareButton
                url={shareUrl}
                quote={title}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={55} round />
              </FacebookShareButton>
            </div>

            <div className={classes.child}>
              <FacebookMessengerShareButton
                url={shareUrl}
                appId="521270401588372"
                className="Demo__some-network__share-button"
              >
                <FacebookMessengerIcon size={55} round />
              </FacebookMessengerShareButton>
            </div>

            <div className={classes.child}>
              <TwitterShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TwitterIcon size={55} round />
              </TwitterShareButton>
            </div>

            <div className={classes.child}>
              <TelegramShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TelegramIcon size={55} round />
              </TelegramShareButton>
            </div>

            <div className={classes.child}>
              <WhatsappShareButton
                url={shareUrl}
                title={title}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={55} round />
              </WhatsappShareButton>
            </div>

            <div className={classes.child}>
              <LinkedinShareButton
                url={shareUrl}
                className="Demo__some-network__share-button"
              >
                <LinkedinIcon size={55} round />
              </LinkedinShareButton>
            </div>

            <div className={classes.child}>
              <PinterestShareButton
                url={String(window.location)}
                // media={`${String(window.location)}/${exampleImage}`}
                className="Demo__some-network__share-button"
              >
                <PinterestIcon size={55} round />
              </PinterestShareButton>
            </div>

            <div className={classes.child}>
              <VKShareButton
                url={shareUrl}
                // image={`${String(window.location)}/${exampleImage}`}
                className="Demo__some-network__share-button"
              >
                <VKIcon size={55} round />
              </VKShareButton>
            </div>

            <div className={classes.child}>
              <OKShareButton
                url={shareUrl}
                // image={`${String(window.location)}/${exampleImage}`}
                className="Demo__some-network__share-button"
              >
                <OKIcon size={55} round />
              </OKShareButton>
            </div>

            <div className={classes.child}>
              <RedditShareButton
                url={shareUrl}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="Demo__some-network__share-button"
              >
                <RedditIcon size={55} round />
              </RedditShareButton>
            </div>

            <div className={classes.child}>
              <TumblrShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <TumblrIcon size={55} round />
              </TumblrShareButton>
            </div>

            <div className={classes.child}>
              <LivejournalShareButton
                url={shareUrl}
                title={title}
                description={shareUrl}
                className="Demo__some-network__share-button"
              >
                <LivejournalIcon size={55} round />
              </LivejournalShareButton>
            </div>

            <div className={classes.child}>
              <MailruShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <MailruIcon size={55} round />
              </MailruShareButton>
            </div>

            <div className={classes.child}>
              <EmailShareButton
                url={shareUrl}
                subject={title}
                body="body"
                className="Demo__some-network__share-button"
              >
                <EmailIcon size={55} round />
              </EmailShareButton>
            </div>
            <div className={classes.child}>
              <ViberShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <ViberIcon size={55} round />
              </ViberShareButton>
            </div>

            <div className={classes.child}>
              <WorkplaceShareButton
                url={shareUrl}
                quote={title}
                className="Demo__some-network__share-button"
              >
                <WorkplaceIcon size={55} round />
              </WorkplaceShareButton>
            </div>

            <div className={classes.child}>
              <LineShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <LineIcon size={55} round />
              </LineShareButton>
            </div>

            <div className={classes.child}>
              <WeiboShareButton
                url={shareUrl}
                title={title}
                // image={`${String(window.location)}/${exampleImage}`}
                className="Demo__some-network__share-button"
              >
                <WeiboIcon size={55} round />
              </WeiboShareButton>
            </div>

            <div className={classes.child}>
              <PocketShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <PocketIcon size={55} round />
              </PocketShareButton>
            </div>

            <div className={classes.child}>
              <InstapaperShareButton
                url={shareUrl}
                title={title}
                className="Demo__some-network__share-button"
              >
                <InstapaperIcon size={55} round />
              </InstapaperShareButton>
            </div>
            {/* </Slider> */}
          </div>
        </div>
      </Fade>
    </Modal>
  );
};
