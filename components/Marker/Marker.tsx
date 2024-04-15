import { useMemo } from 'react';
import Image from 'next/image';
import { Marker as MarkerContainer, Popup } from 'react-leaflet';
import { IPin } from '~/lib/types';
import { getRelativeTimeString, getNameString, getDistance } from '~/lib/utils';
import { getIcon, getFullDateString } from './utils';
import AuthorIcon from '../AuthorIcon';
import { EPinType } from '~/lib/types';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import DirectMessaging from "../Chat/DirectMessaging";
import {update_chat_details} from "../Chat/ChatGPT";


import styles from './style.module.css';
import sidebar_styles from '../Sidebar/style.module.css';

const Marker = ({
  type,
  coordinates,
  city,
  country,
  author,
  photo,
  date,
  assistant_id
}: IPin) => {
  const icon = getIcon(type);

  const community={'city':{city},'country':{country},'author':{author},'photo':{photo},'assistant_id':{assistant_id}};
  const [open, setOpen] = useState(false);
  
  const onOpenModal = (assistant_id) => {
    console.log('o:',assistant_id);
    update_chat_details(assistant_id);
    
    setOpen(true)
  };
  const onCloseModal = () => setOpen(false);

  const name = useMemo(() => getNameString(author), [author]);

  return (
    <MarkerContainer
      icon={icon}
      position={coordinates}
      title={`${name} at ${city}`}
    >
      <Popup>
        <div>
          <div className={styles.background}>
            <div className={styles.text}>
              <h1 className={styles.title}>
                {city}, {country}
              </h1>
              <span className={styles.light}>
                <i className="bi bi-calendar"></i> {getFullDateString(date)} (
                {getRelativeTimeString(date)})
              </span>
              <br />
              <span className={styles.light}>
                <i className="bi bi-signpost-fill"></i>{' '}
                {Math.round(getDistance(coordinates))} km away
              </span>
              <br />
              <span>
                <AuthorIcon author={author} /> {name}
              </span>
              <br/>
              <div>
              <button
                  className={sidebar_styles.button_active}
                  type={'button'}
                  role="button"
                  onClick={() =>onOpenModal(assistant_id)}
                  disabled={type!=EPinType.Chat}
                  hidden={type!=EPinType.Chat}
                >
                  {' '}
                  Chat <i className="bi bi-chat-dots-fill"></i>{' '}
                </button>
                
                <Modal open={open} onClose={onCloseModal} center 
                  classNames={{
                    overlay: styles.customOverlay,
                    modal: styles.customModal,
                  }}
                >

                  <DirectMessaging
                    prompt={`You are someone who knows a lot about this place:${name} at ${city}. ${prompt} This message comes from your friend. Be a helpful concierege. If they refer to 'here' it is in reference to this place:${name} at ${city}. If you repeat the address, omit the city, state, country, and zip code.`}
                    community={community}
                    maxTokens={5}
                  />
                </Modal>
              </div>
            </div>
          </div>
          <Image
            alt={`${name} at ${city}`}
            src={photo}
            layout="fill"
            objectFit="cover"
            className={styles.image}
          />
        </div>
      </Popup>
    </MarkerContainer>
  );
};

export default Marker;
