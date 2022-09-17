import React, { useEffect } from "react";
import axios from "axios"
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router'

const Dashboard = (props) => {
    const { data, status, token } = props;
    const router = useRouter();
    if (token) {
        const cookies = new Cookies();
        cookies.set('token', token, { path: '/' });
    }
    const initialSetting = () => {
        router.replace('/dashboard', undefined, { shallow: true });
    }
    useEffect(() => {
        initialSetting()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (status === 200 && data.is_success) {
        return (
            <>
                <div>Hamza Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, fugiat inventore dicta dolorum quaerat tenetur quasi perspiciatis pariatur tempore hic incidunt vitae recusandae veniam reprehenderit impedit voluptates minus quod reiciendis!</div>
            </>
        )
    }
    else {
        return (
            <>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, fugiat inventore dicta dolorum quaerat tenetur quasi perspiciatis pariatur tempore hic incidunt vitae recusandae veniam reprehenderit impedit voluptates minus quod reiciendis!</div>
            </>
        )
    }
}

export async function getServerSideProps(context) {
    try {
        let token = null;
        if (context.req.cookies && context.req.cookies.token) {
            token = context.req.cookies.token
        }
        if (context.query.token) {
            token = context.query.token
        }
        const response = await axios.get(`${process.env.APP_API_URL}/profile`, {
            headers: {
                'Authorization': token ? token : null
            }
        })
        return {
            props: {
                status: response.status,
                data: response.data,
                token: token ? token : null
            },
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                status: 200,
                data: {
                    is_success: false,
                    message: 'Something went wrong'
                }
            },
        }
    }
}

export default Dashboard;