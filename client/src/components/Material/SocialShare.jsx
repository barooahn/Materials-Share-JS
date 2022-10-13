import React from "react";
import { Modal, Box } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

import {
	// FacebookShareButton,
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
	// FacebookIcon,
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

const SocialSharing = ({ handleShareClose, shareOpen, slug }) => {
	const shareUrl = `${window.location.protocol}//${window.location.hostname}/material/${slug} `;

	const title = "Materials share - Create and share teaching resources ";

	return (
		<Modal
			aria-labelledby='social-share-modal'
			aria-describedby='Share-resources-on-social-media'
			open={shareOpen}
			onClose={handleShareClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={shareOpen}>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: { xs: "98%", sm: "70%", md: "50%" },
						bgcolor: "background.paper",
						border: "2px solid #000",
						boxShadow: 24,
						p: 4,
					}}
				>
					<Box>
						<Typography
							align={"center"}
							component='h5'
							variant='h5'
						>
							Share with...
						</Typography>
						<br />
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
								alignContent: "center",
							}}
						>
							{/* <div >
							<FacebookShareButton
								url={shareUrl}
								quote={title}
								
							>
								<FacebookIcon size={55} round />
							</FacebookShareButton>
						</div> */}

							<div>
								<FacebookMessengerShareButton
									url={shareUrl}
									appId='521270401588372'
								>
									<FacebookMessengerIcon
										size={55}
										round
									/>
								</FacebookMessengerShareButton>
							</div>

							<div>
								<TwitterShareButton
									url={shareUrl}
									title={title}
								>
									<TwitterIcon size={55} round />
								</TwitterShareButton>
							</div>

							<div>
								<TelegramShareButton
									url={shareUrl}
									title={title}
								>
									<TelegramIcon size={55} round />
								</TelegramShareButton>
							</div>

							<div>
								<WhatsappShareButton
									url={shareUrl}
									title={title}
									separator=':: '
								>
									<WhatsappIcon size={55} round />
								</WhatsappShareButton>
							</div>

							<div>
								<LinkedinShareButton url={shareUrl}>
									<LinkedinIcon size={55} round />
								</LinkedinShareButton>
							</div>

							<div>
								<PinterestShareButton
									url={String(window.location)}
									// media={`${String(window.location)}/${exampleImage}`}
								>
									<PinterestIcon size={55} round />
								</PinterestShareButton>
							</div>

							<div>
								<VKShareButton
									url={shareUrl}
									// image={`${String(window.location)}/${exampleImage}`}
								>
									<VKIcon size={55} round />
								</VKShareButton>
							</div>

							<div>
								<OKShareButton
									url={shareUrl}
									// image={`${String(window.location)}/${exampleImage}`}
								>
									<OKIcon size={55} round />
								</OKShareButton>
							</div>

							<div>
								<RedditShareButton
									url={shareUrl}
									title={title}
									windowWidth={660}
									windowHeight={460}
								>
									<RedditIcon size={55} round />
								</RedditShareButton>
							</div>

							<div>
								<TumblrShareButton
									url={shareUrl}
									title={title}
								>
									<TumblrIcon size={55} round />
								</TumblrShareButton>
							</div>

							<div>
								<LivejournalShareButton
									url={shareUrl}
									title={title}
									description={shareUrl}
								>
									<LivejournalIcon size={55} round />
								</LivejournalShareButton>
							</div>

							<div>
								<MailruShareButton
									url={shareUrl}
									title={title}
								>
									<MailruIcon size={55} round />
								</MailruShareButton>
							</div>

							<div>
								<EmailShareButton
									url={shareUrl}
									subject={title}
									body='body'
								>
									<EmailIcon size={55} round />
								</EmailShareButton>
							</div>
							<div>
								<ViberShareButton
									url={shareUrl}
									title={title}
								>
									<ViberIcon size={55} round />
								</ViberShareButton>
							</div>

							<div>
								<WorkplaceShareButton
									url={shareUrl}
									quote={title}
								>
									<WorkplaceIcon size={55} round />
								</WorkplaceShareButton>
							</div>

							<div>
								<LineShareButton
									url={shareUrl}
									title={title}
								>
									<LineIcon size={55} round />
								</LineShareButton>
							</div>

							<div>
								<WeiboShareButton
									url={shareUrl}
									title={title}
									// image={`${String(window.location)}/${exampleImage}`}
								>
									<WeiboIcon size={55} round />
								</WeiboShareButton>
							</div>

							<div>
								<PocketShareButton
									url={shareUrl}
									title={title}
								>
									<PocketIcon size={55} round />
								</PocketShareButton>
							</div>

							<div>
								<InstapaperShareButton
									url={shareUrl}
									title={title}
								>
									<InstapaperIcon size={55} round />
								</InstapaperShareButton>
							</div>
						</Box>
					</Box>
				</Box>
			</Fade>
		</Modal>
	);
};
export default SocialSharing;
