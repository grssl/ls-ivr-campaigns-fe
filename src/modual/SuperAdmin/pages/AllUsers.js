import React, { useEffect, useState } from "react";
import {
  isEmail,
  isMaxLength,
  isMinLength,
  isPattern,
} from "@formiz/validations";
import { toast } from "react-toastify";
import { useForm } from "@formiz/core";
import CommunEditModal from "../../../components/Modal/CommunEditModal";
import FormWizard from "../../../components/Form/FormWizard";
import TableComponent from "../../../components/Table/TableComponent";
import CommunModal from '../../../components/Modal/CommunModal';
import APICall from '../../../components/Api/APICall';
import { ActiveDeactivate } from '../../CommanApiFunction';

export default function AllUsers() {
  const [RowEditData, setRowEditData] = useState([]);
  const [editInput, seteditInput] = useState([]);
  const [Customer, setCustomer] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const col = [
    {
      accessor: "userId",
      Header: "Login Id",
    },
    {
      accessor: "userName",
      Header: "User Name",
    }, {
      accessor: "email",
      Header: "User Email",
    }, {
      accessor: "role",
      Header: "Role",
    },
    // {
    //   accessor: "status",
    //   Header: "Status",
    // },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const myForm = useForm();
  const editFormSubmit = (values) => {
    setIsLoading(true);
    alert("edit");
    alert(JSON.stringify(values));
  };
  const submitForm = (values) => {
    // alert(JSON.stringify(values));
    setIsLoading(true);
    APICall("/auth/addUsers", "POST", values).then(
      (response) => {
        if (response.status) {
          setIsLoading(false);
          myForm.reset();
          toast.success(response.message);
          userAPiCall();
        } else {
          toast.error(response.message);
        }
      }
    );
  };

  const userAPiCall = () => {
    APICall("/auth/getUsers").then((data) => {
      const rolData = data;
      // rolData.forEach((item, i) => {
      //   rolData[i]["status"] = ActiveDeactivate(item.status)
      // });
      setCustomer(rolData);
    });
  };

  const UserStatusHandler = () => {
    // alert(JSON.stringify(RowEditData));
    RowEditData.map((v) => {
      // ApiCalling("/api/updateuser", "POST", {
      //   userName: UserName,
      //   userPhone: MobileNumber,
      //   userEmail: EmailID,
      //   role: RoleID,
      //   department: DepartmentID,
      //   UserId: UserID,
      //   status: status,
      //   updateUId: UserID,
      //   reqType: 1,
      // })
      //   .then(() => {
      //     userAPiCall();
      //     toast.success("User status updated");
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });

      return "";
    });
  };

  const selectMenuHandoler = (event) => {
    const value = event.target.value;
    const { _id, formtype } = RowEditData;
    switch (value) {
      case "active":
        UserStatusHandler(1);
        break;
      case "deactive":
        UserStatusHandler(0);
        break;
      case "delete":
        if (formtype === "delete") {
          if (window.confirm("Are you sure you want to delete this" + _id)) {
            toast.warning("On Working");
          }
        }
        break;
      case "edit":
        if (RowEditData.length > 1) {
          toast.error("Please select only one row at a time");
        } else {
          // alert(JSON.stringify(RowEditData));
          toast.warning("On Working");
        }

        break;
      default:
        toast.error("Select Valid Options");
        break;
    }
  };
  const inptFildes = [
    {
      title: "Add New User",
      fileds: [
        {
          name: "userId",
          label: "Login Id",
          required: "User Login Id is required",
          type: "text",
          // validations: [
          //   {
          //     rule: isPattern("^[0-9]*$"),
          //     message: "only Number value allowed",
          //   },
          //   {
          //     rule: isMinLength(4),
          //     message: "This should at least have a length of 4",
          //   },
          //   {
          //     rule: isMaxLength(4),
          //     message: "This should have a length of 4",
          //   },
          // ],
        }, {
          name: "userName",
          label: "User Name",
          required: "User name is required",
          type: "text",
        }, {
          name: "email",
          label: "User Email",
          required: "User Email is required",
          type: "text",
          validations: [
            {
              rule: isEmail(),
              message: "Not a valid email address",
            },

          ],
        }, {
          name: "password",
          label: "User password",
          required: "User password is required",
          type: "password",
        },
        {
          name: "role",
          label: "User role",
          required: "User role is required",
          type: "select",
          options: [
            { label: "Select User Role", value: "0" },
            // { label: "Agent", value: "AGENT" },
            // { label: "Lead", value: "LEAD" },
            // { label: "Admin", value: "ADMIN" },
            { label: "Supper Admin", value: "SUPERADMIN" },
          ],
        },

      ],
    },
  ];
  const selectRowOption = (
    <select
      className="form-select  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      onChange={(e) => selectMenuHandoler(e)}
    >
      <option selected value={0}>
        Select Menu
      </option>
      <option value="edit">Edit</option>
      <option value="active">Active</option>
      <option value="deactive">De-Active</option>
      <option value="delete">Delete</option>
    </select>
  );

  useEffect(() => {
    // DepartmentApiCall(setDepartmentList);
    userAPiCall();
  }, []);
  return (
    <>
      <h3 className="text-center font-bold text-xl uppercase bg-blue-200 p-2 "> User Management</h3>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <CommunEditModal
          showModal={showModal}
          setShowModal={setShowModal}
          Title="Update User"
        >
          <FormWizard
            inputes={editInput}
            showStep={false}
            isLoading={isLoading}
            submitForm={editFormSubmit}
            myForm={myForm}
          />
        </CommunEditModal>
        <TableComponent
          columns={col}
          data={Customer}
          selectOption={{ show: false, option: selectRowOption }}
          pagination={true}
          exportData={true}
          TicketsTitle={`Users List`}
          other={
            <CommunModal
              showModal={showModal}
              setShowModal={setShowModal}
              btnName="Add User"
              Title="Add New User"
            >
              <FormWizard
                inputes={inptFildes}
                showStep={false}
                isLoading={isLoading}
                submitForm={submitForm}
                myForm={myForm}
              />
            </CommunModal>
          }
          action={{ setRowEditData }}
        />
      </div>
    </>
  );
}
