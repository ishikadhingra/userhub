import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import conf from '../../conf/conf'
import axios from 'axios'
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Button,
    IconButton,
    TablePagination,
    Typography,
    Box
} from '@mui/material'
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import 'react-toastify/dist/ReactToastify.css'
import './UserListing.css'
import { useTheme } from '../../context/ThemeContext'


function UserLists() {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { darkMode } = useTheme()
    const sidebarRef = useRef(null);
    const headerRef = useRef(null);
    const mainRef = useRef(null);

    const fetchUsers = async (page) => {
        const res = await fetch(`${conf.apiUrl}/get?page=${page + 1}&limit=${rowsPerPage}`)
        return res.json()
    }

    const { error, data, isPending, isPreviousData } = useQuery({
        queryKey: ['users', page, rowsPerPage],
        queryFn: () => fetchUsers(page),
        keepPreviousData: true,
    })

    const onUpdateRedirection = async (id) => {
        navigate(`/dashboard/user-form?id=${id}`)
    }

    const onDelete = async (id) => {
        try {
            const response = await axios.delete(`${conf.apiUrl}/delete/${id}`)
                if(response.status === 200) {
                toast.success("User deleted successfully")
                queryClient.invalidateQueries(['users'])
                } else {
                toast.error("User deletion failed")
                } 
        } catch (error) {
            console.error("Error:", error)
            toast.error("Failed to delete user")
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    if (error) {
        return (
            <Box p={3}>
                <Typography color="error">An error has occurred: {error.message}</Typography>
            </Box>
        )
    }

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-10 ">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">User List</h2>

                    {/* Table for md+ screens */}
                    <div className="d-none d-md-block">
                        <div className={`rounded  overflow-x-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <table className="table table-hover align-middle mb-0">
                                <thead>
                                    <tr style={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)' }}>
                                        <th style={{ color: '#000', fontWeight: 700, fontSize: '1.08rem', letterSpacing: '0.5px' , backgroundColor:'#bdc7e7', border:'1px solid #dedede'}}>S.No.</th>
                                        <th style={{ color: '#000', fontWeight: 700, fontSize: '1.08rem', letterSpacing: '0.5px' , backgroundColor:'#bdc7e7', border:'1px solid #dedede'}}>User</th>
                                        <th style={{ color: '#000', fontWeight: 700, fontSize: '1.08rem', letterSpacing: '0.5px' , backgroundColor:'#bdc7e7', border:'1px solid #dedede'}}>Email</th>
                                        <th style={{ color: '#000', fontWeight: 700, fontSize: '1.08rem', letterSpacing: '0.5px' , backgroundColor:'#bdc7e7', border:'1px solid #dedede'}}>Phone</th>
                                        <th style={{ color: '#000', fontWeight: 700, fontSize: '1.08rem', letterSpacing: '0.5px' , backgroundColor:'#bdc7e7', border:'1px solid #dedede'}}>Sex</th>
                                        <th style={{ color: '#000', fontWeight: 700, fontSize: '1.08rem', letterSpacing: '0.5px' , backgroundColor:'#bdc7e7', border:'1px solid #dedede'}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isPending ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-300">Loading...</td>
                                        </tr>
                                    ) : (
                                        data?.result?.map((user, idx) => (
                                            <tr
                                                key={user._id}
                                                className={
                                                    darkMode
                                                        ? `border-b border-gray-700 ${idx % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}`
                                                        : `${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`
                                                }
                                            >
                                                <td className="text-gray-900 dark:text-white">{idx + 1 + page * rowsPerPage}</td>
                                                <td className="text-gray-900 dark:text-white">{user.firstName}</td>
                                                <td className="text-gray-900 dark:text-white">{user.email}</td>
                                                <td className="text-gray-900 dark:text-white">{user.number}</td>
                                                <td className="text-gray-900 dark:text-white">{user.sex}</td>
                                                <td className="text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => onUpdateRedirection(user._id)}
                                                        >
                                                            <span className="material-icons align-middle">edit</span>
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() => onDelete(user._id)}
                                                        >
                                                            <span className="material-icons align-middle">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    {data?.result?.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-300">No users found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Cards for mobile screens */}
                    <div className="d-block d-md-none">
                        {isPending ? (
                            <div className="text-center py-4 text-gray-500 dark:text-gray-300">Loading...</div>
                        ) : (
                            data?.result?.map((user) => (
                                <div
                                    key={user._id}
                                    className={`mb-4 rounded shadow p-3 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold">{user.firstName}</span>
                                        <div className="flex gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => onUpdateRedirection(user._id)}
                                            >
                                                <span className="material-icons align-middle">edit</span>
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => onDelete(user._id)}
                                            >
                                                <span className="material-icons align-middle">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <div><span className="font-medium">Mobile:</span> {user.number}</div>
                                        <div><span className="font-medium">Email:</span> {user.email}</div>
                                        <div><span className="font-medium">Sex:</span> {user.sex}</div>
                                    </div>
                                </div>
                            ))
                        )}
                        {data?.result?.length === 0 && (
                            <div className="text-center py-4 text-gray-500 dark:text-gray-300">No users found</div>
                        )}
                    </div>
                </div>

            </div>
            <ToastContainer />
             <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                    disabled={page === 0}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        opacity: page === 0 ? 0.5 : 1,
                    }}
                >
                    Previous Page
                </button>
                <span style={{ margin: '0 10px' }}>Page {page + 1}</span>
                <button
                    onClick={() => {
                        if (!isPreviousData && data?.result?.length > 0) {
                            setPage((old) => old + 1)
                        }
                    }}
                    disabled={isPreviousData || data?.result?.length === 0}
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                        margin: '4px 2px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        opacity: isPreviousData || data?.result?.length === 0 ? 0.5 : 1,
                    }}
                >
                    Next Page
                </button>
            </div>
        </div>
    )
}

export default UserLists