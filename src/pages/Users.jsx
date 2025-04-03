import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import UserService from '../services/userservice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUsers } from '../rtkstore/userSlice';

export function Users() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    let dispatch=useDispatch()

    const [totalRecords, setTotalRecords] = useState(0);
    const [first, setFirst] = useState(0);
    const rowsPerPage = 10;
    let navigate=useNavigate()

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        username: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] },
        phone: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }] }
    });

    useEffect(() => {
        fetchCustomers(first, rowsPerPage);
    }, [first]);

    const fetchCustomers = async (pageStart, limit) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await UserService.getUsers(pageStart, limit);
            console.log(response.data.users)
            setCustomers(response.data.users);
            setTotalRecords(response.data.total);
        } catch (err) {
            setError("Failed to load user data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters.global.value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        fetchCustomers(event.first, event.rows);
    };

    const renderHeader = () => (
        <div className="flex flex-wrap gap-2 justify-between items-center">
            <h4 className="m-0 text-lg font-semibold">Users</h4>
            <IconField iconPosition="left" className="w-full sm:w-auto">
                <InputIcon className="pi pi-search" />
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Search users"
                    className="p-2 border rounded-md w-full sm:w-auto"
                />
            </IconField>
        </div>
    );

    function handleRowClick(ele) {
        console.log(ele)
        dispatch(addUsers(ele))

        navigate(`/user/${ele.id}`)
    }

    return (
        <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg">
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[88vh]">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : error ? (
                <div className="flex flex-col justify-center items-center min-h-[83vh]">
                    <p className="text-red-500 font-medium text-center">{error}</p>
                    <button
                        onClick={() => fetchCustomers(first, rowsPerPage)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <DataTable
                        value={customers}
                        paginator
                        lazy
                        first={first}
                        onPage={onPageChange}
                        selectionMode="single"
                        onRowClick={(e) => handleRowClick(e.data)}
                        rows={rowsPerPage}
                        totalRecords={totalRecords}
                        loading={isLoading}
                        header={renderHeader()}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        className="w-full rounded-lg border border-gray-200 cursor-pointer"
                        responsiveLayout="scroll"
                        emptyMessage="No users found."
                        rowClassName={() => "hover:bg-red-600 hover:text-white transition-all duration-200 ease-in-out"}
                    >

                        <Column
                            field="username"
                            header="User Name"
                            sortable
                            filter
                            filterPlaceholder="Search by name"
                            style={{ minWidth: '12rem' }}
                        />
                        <Column
                            field="email"
                            header="Email"
                            sortable
                            filter
                            filterPlaceholder="Search by email"
                            style={{ minWidth: '14rem' }}
                        />
                        <Column
                            field="phone"
                            header="Phone"
                            sortable
                            filter
                            filterPlaceholder="Search by phone"
                            style={{ minWidth: '10rem' }}
                        />
                    </DataTable>
                </div>
            )}
        </div>
    );
}
