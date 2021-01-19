import React, { useState, useMemo, useCallback } from 'react';
import { Box, Button } from 'grommet';
import { graphql, useStaticQuery } from 'gatsby';
import GithubCorner from '../components/GithubCorner';
import Footer from '../components/Footer';
import ModalEvent from '../components/ModalEvent';
import Month from '../components/Calendar/Month';
import Hero from '../components/Hero';
import HeroFooter from '../components/HeroFooter';
import Layout from '../components/Layout';
import groupEventsByMonth from '../utils/groupEventsByMonth';
import { format } from 'date-fns';
import NavBar from '../components/Navbar.js';
import '../utils/css.css';

// override this query with your own questions!
const SPREADSHEET_QUERY = graphql`
  query eventsQuery {
    site {
      siteMetadata {
        limitMonthInTheFuture
      }
    }
    allGoogleSheetEventsRow: allGoogleSheetPrenotazioniRow {
      nodes {
        id
        eventName: timeorario
        date: daygiorno
      }
    }
    contentfulCalendarioUpdate {
      scriviQui
      updatedAt
    }
  }
`;

const CalendarPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const {
    allGoogleSheetEventsRow,
    site,
    contentfulCalendarioUpdate,
  } = useStaticQuery(SPREADSHEET_QUERY);

  let updated = contentfulCalendarioUpdate.updatedAt
    .slice(0, 16)
    .replace(/-/g, '/')
    .replace(/T/g, ' at ');

  const newDate =
   new Date(contentfulCalendarioUpdate.updatedAt).valueOf() * 1.000002234654571;//Ora Solare
  //  new Date(contentfulCalendarioUpdate.updatedAt).valueOf()*1.000004469314136;//Ora legale (ZULU TIME)

     updated = new Date(newDate).toString().slice(0, 21);


  const { limitMonthInTheFuture } = site.siteMetadata;

  const months = useMemo(
    () =>
      groupEventsByMonth(allGoogleSheetEventsRow.nodes, limitMonthInTheFuture),
    [allGoogleSheetEventsRow.nodes, limitMonthInTheFuture],
  );

  const openModal = useCallback((data: ModalData) => {
    setModalData(data);
    setShowModal(true);
  }, []);

  return (
    <Layout>
      <NavBar />
      <Hero />
      <Box id="calendars" animation="fadeIn">
        {months.map((month) => (
          <Month
            key={format(month.startDate, 'MM')}
            openModal={openModal}
            {...month}
          />
        ))}
      </Box>
      {showModal && (
        <ModalEvent onClose={() => setShowModal(false)} {...modalData!} />
      )}
      <HeroFooter />
      {contentfulCalendarioUpdate.scriviQui &&
        `Last update: ${updated} (GMT+01:00) Rome`}
      <Footer />
    </Layout>
  );
};


export default CalendarPage;
