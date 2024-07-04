import Navbar from '../../../components/navbar';
import ClassCard from '../../../components/ClassCard';
import axios from 'axios';
// import Spinner from '../../../components/spinner';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Subjects = ({ subjectsJson }) => {
  console.log(subjectsJson);
  if (subjectsJson == undefined) { return <div className='font-bold font-poppins ml-10 m-5 text-2xl'>Loading...</div> }
  return (
    <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
      {subjectsJson.map(subject => (
        <button type="button" className="px-6 py-3.5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {subject.subject}
        </button>
        )
      )}
    </div>

  )
}



export default function BatchView() {
  const router = useRouter();
  var { batchID } = router.query;
  const [batchDetails, setBatchDetails] = useState({});
  const [gotBatch, setGotBatch] = useState(false);
  const [scheduleCards, setScheduleCards] = useState([]);
  const [kitneClassThe, setKitneClassThe] = useState(0); // Sholay refrence?
  // console.log(batchID);

  const getBatchDetails = async () => {
    var batchID = router.query.batchID;
    if (batchID == undefined) {
      setGotBatch(false);
      // console.log("ok")
      return;
    }
    const loginData = JSON.parse(localStorage.getItem("login-data"));
    if (loginData === null || !loginData.hasOwnProperty("access_token")) {
      localStorage.setItem("isLoggedIn", false);
      router.push("/login");
      return;
    }
    const endpoint = "/api/batch-details";
    const payload = {
      access_token: loginData.access_token,
      batchID: batchID,
    };
    var res = await axios.post(endpoint, payload);
    // console.log(res.status, res.data);
    if (res.status === 200 && res.data.success) {
      setBatchDetails(res.data.data);
      // console.log(res.data.data);
      setGotBatch(true);
    }
  }

  var subIDs = [];

  useEffect(() => {
    // var batchID = router.query.batchID;
    // console.log(batchID);
    if (!gotBatch) {
      // console.log("ok");
      getBatchDetails();
    } else if (gotBatch && batchDetails) {
      const subs = batchDetails.subjects;
      // console.log(subs);
      subs.forEach((item) => {
        subIDs.push(item._id);
      });
    }
  }, [gotBatch, batchID])

  function redirect() {
    router.push("/batches")
  }

  return (
    <div>
      {batchDetails ?
        <div>
          <Navbar />
          <div className="h-screen ease-in-out duration-500 bg-gray-100 dark:bg-[#121212]">
            <div className='flex flex-row'>
              <div className="backButton mx-10 text-2xl hover:cursor-pointer pt-5"><FontAwesomeIcon onClick={() => { router.back() }} icon={faArrowLeft} /></div>
              <div className='font-bold font-poppins my-5 text-2xl '>{batchDetails.name}</div>
            </div>
            <Subjects subjectsJson={batchDetails.subjects} />
          </div>
        </div>
        : <div className='font-bold font-poppins m-5 text-2xl'>Loading...</div>
      }
    </div >
  )
}

