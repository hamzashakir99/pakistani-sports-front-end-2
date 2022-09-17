import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import axios from "axios"
import Error from "../components/shared/Error"
import messages from "../utils/message"
import { useUserAgent } from 'next-useragent'
import { useRouter } from 'next/router'

const Login = (props) => {
    const { error_message, uaString } = props;
    const [deviceInfo, setDeviceInfo] = useState({
        deviceType: "NA",
        deviceVendor: "NA",
        os: "NA",
        osVersion: "NA",
        browser: "NA",
        browserVersion: "NA"
    })
    const router = useRouter();
    const initialSetting = () => {
        let ua = null;
        if (uaString) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            ua = useUserAgent(uaString)
        } else {
            if (typeof window !== "undefined") {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                ua = useUserAgent(window.navigator.userAgent)
            }
        }
        if (ua) {
            setDeviceInfo((prev) => {
                return {
                    ...prev,
                    deviceType: ua.deviceType ? ua.deviceType : "NA",
                    deviceVendor: ua.deviceVendor ? ua.deviceVendor : "NA",
                    os: ua.os ? ua.os : "NA",
                    osVersion: ua.osVersion ? ua.osVersion : "NA",
                    browser: ua.browser ? ua.browser : "NA",
                    browserVersion: ua.browserVersion ? ua.browserVersion : "NA",
                }
            })
        }
        router.replace('/login', undefined, { shallow: true });
    }
    useEffect(() => {
        initialSetting()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {
                error_message ? <p>{error_message}</p> : null
            }
            <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google?device_type=${deviceInfo.deviceType}&device_vendor=${deviceInfo.deviceVendor}&os=${deviceInfo.os}&os_version=${deviceInfo.osVersion}&browser=${deviceInfo.browser}&browser_version=${deviceInfo.browserVersion}`} passHref={true}
            >
                Login with Google
            </Link>
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        if (context.req.cookies && context.req.cookies.token) {
            const token = context.req.cookies.token
            const response = await axios.get(`${process.env.APP_API_URL}/profile`, {
                headers: {
                    Authorization: token
                }
            })
            if (response.status === 200 && response.data.is_success) {
                return {
                    redirect: {
                        permanent: false,
                        destination: "/"
                    }
                }
            }
            else {
                return {
                    props: {
                        status: response.status,
                        data: response.data,
                        uaString: context.req.headers['user-agent'],
                        error_message: context.query.result ? context.query.result : null
                    },
                }
            }
        }
        else {
            return {
                props: {
                    status: 200,
                    data: {
                        is_success: false,
                        message: 'not login',
                        uaString: context.req.headers['user-agent']
                    },
                    error_message: context.query.result ? context.query.result : null
                },
            }
        }
    } catch (error) {
        console.log(error)
        return {
            props: {
                status: 200,
                data: {
                    is_success: false,
                    message: 'Something went wrong',
                    uaString: context.req.headers['user-agent']
                },
                error_message: context.query.result ? context.query.result : null
            },
        }
    }
}


export default Login