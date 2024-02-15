import { Input, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventData } from "../../Api/manager";
import { Box, Modal } from "@mui/material";
import { styleImageOpen } from "../../JsStyles/Styles";

export const EventSeeMore = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchEventData = async () => {
    try {
      const res = await getEventData(eventId);
      setEventData(res?.data?.eventData);
    } catch (error) {
      console.log(error);
    }
  };
   
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  useEffect(() => {
    fetchEventData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="min-h-screen bg-cover">
      <div className="mx-auto max-w-screen-xl  px-4 py-0 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg shadow-blue-400 border my-8  lg:col-span-3 lg:p-12">
          <div action="" className="space-y-4">
            <span className="flex items-center p-5">
              <span className="pr-6 font-bold font-mono text-blue-800">
                Event Details
              </span>
              <span className="h-px flex-1 bg-black"></span>
            </span>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2  ">
              <div>
                <span className="label-text text-base from-neutral-500">
                  Name of the Event.
                </span>

                <Input variant="static" readOnly value={eventData.eventName} />
              </div>

              <div>
                <span className="label-text text-base from-neutral-500">
                  Category Of the Event.
                </span>

                <Input
                  variant="static"
                  readOnly
                  value={eventData.eventCategory}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
              <div>
                <span className="label-text text-base from-neutral-500">
                  Venue Name.
                </span>

                <Input variant="static" readOnly value={eventData.venueName} />
              </div>

              <div>
                <span className="label-text text-base from-neutral-500">
                  Venue Type.
                </span>

                <Input variant="static" readOnly value={eventData.venueType} />
              </div>
            </div>

            <div className="pt-2">
              <span className="label-text text-base from-neutral-500">
                Venue Location.
              </span>

              <Input
                variant="static"
                readOnly
                value={eventData.venueLocation}
              />
            </div>

            {/* change to muix compoent */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
              <div>
                <div className="flex items-center">
                  <span className="mr-2">From:</span>
                  <Input
                    variant="static"
                    readOnly
                    value={eventData.startDate}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center">
                  <span className="mr-2">To:</span>
                  <Input variant="static" readOnly value={eventData.endDate} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
              <div>
                <span className="label-text text-base from-neutral-500">
                  Expected Number of Guests:
                </span>

                <Input variant="static" readOnly value={eventData.noofGuests} />
              </div>

              <div>
                <span className="label-text text-base from-neutral-500">
                  Special Guest Requirements:
                </span>

                <label htmlFor="yes">
                  <Input
                    variant="static"
                    readOnly
                    value={eventData.guestRequirement}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
              <div>
                <span className="label-text text-base from-neutral-500">
                  Catering Needs:
                </span>

                <div className="flex items-center space-x-4 mt-2 ml-2">
                  <label htmlFor="yes">
                    <Input
                      variant="static"
                      readOnly
                      value={eventData.cateringNeeds}
                    />
                  </label>
                </div>
              </div>

              <div>
                <span className="label-text text-base from-neutral-500">
                  No of catering services.
                </span>

                <Input
                  variant="static"
                  readOnly
                  value={
                    eventData.numberOfServices
                      ? eventData.numberOfServices
                      : "Nil"
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-3">
              <div>
                <span className="label-text text-base from-neutral-500">
                  Food Preference.
                </span>

                <div className="flex items-center space-x-4 mt-2 ml-2">
                  <label htmlFor="yes">
                    <Input
                      variant="static"
                      readOnly
                      value={eventData.foodPreference}
                    />
                  </label>
                </div>
              </div>

              <div>
                <span className="label-text text-base from-neutral-500">
                  Dietary restrictions or specific cuisines.
                </span>

                <Textarea
                  variant="static"
                  readOnly
                  value={eventData.cuisines ? eventData.cuisines : "Nil"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
              <div>
                <span className="label-text text-base from-neutral-500">
                  Entertainment.
                </span>

                <Input
                  variant="static"
                  readOnly
                  value={eventData.desiredEntertainment}
                />
              </div>

              <div>
                <span className="label-text text-base from-neutral-500">
                  Entertainer to be invited.
                </span>

                <Input
                  variant="static"
                  readOnly
                  value={eventData.entertainer ? eventData.entertainer : "Nil"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3 pt-5">
              <div>
                <span className="label-text text-base from-neutral-500">
                  Event Themes.
                </span>

                <Input variant="static" readOnly value={eventData.eventTheme} />
              </div>
              <div>
                <span className="label-text text-base from-neutral-500">
                  Any other.
                </span>

                <Input
                  variant="static"
                  readOnly
                  value={eventData.otherTheme ? eventData.otherTheme : "Nil"}
                />
              </div>

              <div>
                <span className="label-text text-base from-neutral-500">
                  Uploaded image.
                </span>

                <button
                  className="block w-full rounded-lg border border-gray-400 p-3 text-blue-800 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                  onClick={handleOpen}
                >
                  See Image
                </button>
              </div>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={styleImageOpen}>
                <img
                  src={
                    eventData.themeImage
                      ? eventData.themeImage
                      : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                  }
                  alt=""
                />
              </Box>
            </Modal>
            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
              <div>
                <span className="label-text text-base from-neutral-500">
                  Audio/Visual.
                </span>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <Input
                      variant="static"
                      readOnly
                      value={eventData.audioVisual}
                    />
                  </label>
                </div>
              </div>

              <div>
                <span className="label-text text-base from-neutral-500">
                  Technical support.
                </span>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <Input
                      variant="static"
                      readOnly
                      value={eventData.techSupport}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <span className="label-text text-base from-neutral-500">
                Additional Requirements.
              </span>

              <Textarea
                variant="static"
                readOnly
                value={
                  eventData.additionalRequirement
                    ? eventData.additionalRequirement
                    : "Nil"
                }
              />
            </div>

            <span className="flex items-center p-5">
              <span className="pr-6 font-bold font-mono text-blue-800">
                Personal Details
              </span>
              <span className="h-px flex-1 bg-black"></span>
            </span>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
              <div>
                <span className="label-text text-base from-neutral-500">
                  Name.
                </span>

                <Input variant="static" readOnly value={eventData.name} />
              </div>

              <div>
                <span className="label-text text-base from-neutral-500">
                  Email Address.
                </span>

                <Input variant="static" readOnly value={eventData.email} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
              <div>
                <span className="label-text text-base from-neutral-500">
                  Phone Number.
                </span>

                <Input
                  variant="static"
                  readOnly
                  value={eventData.phoneNumber}
                />
              </div>

              <div>
                <span className="label-text text-base from-neutral-500">
                  Alternative Phone Number.
                </span>

                <Input
                  variant="static"
                  readOnly
                  value={eventData.alternativePhoneNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
