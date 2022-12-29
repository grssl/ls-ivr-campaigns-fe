import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import APICall, { explodeDataWithRowTable } from '../components/Api/APICall';
const CommanApiGETFunction = async (url, setOutputList, explodeData = true) => {
  await APICall(url, "GET")
    .then((response) => {
      if (response.status) {

        if (explodeData) {
          explodeDataWithRowTable(response.data, setOutputList);
        } else {
          if (response.data.length > 0) {
            setOutputList(response.data);
          } else {
            setOutputList([])
          }
          // toast.error("Data Not  found")
        }
      } else {
        toast.error(response.message)
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const GetSatartAndEndDate = (type) => {
  const data = {
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
  }
  switch (type) {
    case "yesterday":
      const thisWeek = dayjs().add(-1, "day");
      data.startDate = dayjs(thisWeek).format("YYYY-MM-DD");
      data.endDate = dayjs(thisWeek).format("YYYY-MM-DD");

      break;
    case "ThisWeek":
      const yesterDay = dayjs().startOf("week");
      data.startDate = dayjs(yesterDay).format("YYYY-MM-DD");
      data.endDate = dayjs(yesterDay).endOf("week").format("YYYY-MM-DD");

      break;
    case "LastWeek":
      const lastWeek = dayjs().startOf("week");
      data.startDate = dayjs(lastWeek).add(-7, "day").format("YYYY-MM-DD");
      data.endDate = dayjs(lastWeek).add(-1, "day").format("YYYY-MM-DD");

      break;
    case "ThisMonth":
      const thisMonth = dayjs().startOf("month");
      data.startDate = dayjs(thisMonth).format("YYYY-MM-DD");
      data.endDate = dayjs(thisMonth).endOf("month").format("YYYY-MM-DD");
      break;
    case "LastMonth":
      const lastMonth = dayjs().startOf("month");
      data.startDate = dayjs(lastMonth).add(-1, "month").format("YYYY-MM-DD");
      data.endDate = dayjs(lastMonth).add(-1, "day").format("YYYY-MM-DD");
      break;
    case "ThisYear":
      const thisYear = dayjs().startOf("year");
      data.startDate = dayjs(thisYear).format("YYYY-MM-DD");
      data.endDate = dayjs().endOf("year").format("YYYY-MM-DD");
      break;
    case "LastYear":
      const lastYear = dayjs().startOf("year");
      data.startDate = dayjs(lastYear).add(-1, "year").format("YYYY-MM-DD");
      data.endDate = dayjs(lastYear).add(-1, "day").format("YYYY-MM-DD");
      break;

    default:
      break;
  }
  return data;
}


function convortDateStingToDateTime(datetime) {
  const [dateValues, timeValues] = datetime.split(' ');
  const [month, day, year] = dateValues.split('-');
  const [hours, minutes, seconds] = timeValues.split(':');
  const date = new Date(year, month - 1, day, hours, minutes, seconds);
  return date;
}



const ActiveDeactivate = (Enable) => {
  return Enable === "1" ? (
    <b className="rounded-full bg-green-400 px-1.5 py-px text-xs font-semibold uppercase text-white hover:bg-green-500 dark:bg-transparent dark:text-zinc-200 dark:ring-1 dark:ring-green-600/70 dark:hover:text-white dark:hover:ring-green-600">
      Active
    </b>
  ) : (
    <b className="rounded-full bg-red-400 px-1.5 py-px text-xs font-semibold uppercase text-white hover:bg-red-500 dark:bg-transparent dark:text-zinc-200 dark:ring-1 dark:ring-red-600/70 dark:hover:text-white dark:hover:ring-red-600">
      De-Active
    </b>
  )
}
function getRandomRgbColor() {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = (num >> 8) & 255;
  var b = num & 255;
  return "rgb(" + r + ", " + g + ", " + b + ")";
}


const DashboardCountApiCall = (setData, type, data) => {
  APICall(`/getCurrentDashboard?type=${type}`).then(response => {
    if (Object.keys(response).length > 0) {
      setData(response);
    }
  })
}
export default CommanApiGETFunction;
export {
  GetSatartAndEndDate,
  convortDateStingToDateTime,
  ActiveDeactivate,
  getRandomRgbColor,
  DashboardCountApiCall
}

