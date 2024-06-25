import { useEffect, useState } from "react"

export default function () {
    let [light, setIsLight] = useState(document.body.getAttribute('theme-mode') != 'dark')
    useEffect(() => {
        let theme = document.body.getAttribute('theme-mode')
        if (theme == 'dark') {
            setIsLight(false)
        }
        else {
            setIsLight(true)
        }
    }, [document.body.getAttribute('theme-mode')])
    return (
        light ?
            <svg width="144" height="138" viewBox="0 0 144 138" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="143" height="137" rx="7.5" fill="white" />
                <rect x="0.5" y="0.5" width="143" height="137" rx="7.5" stroke="#DEE0E3" />
                <rect x="10" y="10" width="124" height="80" rx="6" fill="#F5F6F7" />
                <rect x="27" y="23" width="16" height="16" rx="2" fill="#DEE0E3" />
                <rect x="27" y="42" width="16" height="16" rx="2" fill="#DEE0E3" />
                <rect x="27" y="61" width="16" height="16" rx="2" fill="#DEE0E3" />
                <rect x="48" y="29" width="16" height="4" rx="2" fill="#8F959E" />
                <rect x="48" y="48" width="16" height="4" rx="2" fill="#8F959E" />
                <rect x="48" y="67" width="16" height="4" rx="2" fill="#8F959E" />
                <path d="M69.368 123.316H67.506L67.198 122.042C67.8 122.098 68.36 122.126 68.892 122.126C69.396 122.126 69.662 121.846 69.662 121.314V110.618H70.978V121.636C70.978 122.756 70.432 123.316 69.368 123.316ZM66.68 111.682H67.968V120.474H66.68V111.682ZM58.966 111.01H65.84V112.298H62.298C62.214 112.858 62.102 113.39 61.976 113.908H65.21V115.084C64.594 119.032 62.704 121.776 59.512 123.316L58.868 122.126C60.394 121.384 61.598 120.334 62.466 118.99C61.822 118.486 61.066 117.996 60.226 117.548C59.918 117.926 59.596 118.276 59.26 118.598L58.616 117.352C59.904 116.12 60.688 114.426 60.996 112.298H58.966V111.01ZM60.926 116.526C61.738 116.96 62.452 117.422 63.082 117.898C63.474 117.072 63.768 116.162 63.964 115.168H61.57C61.374 115.658 61.164 116.106 60.926 116.526ZM73.4 111.626H78.328V110.548H79.672V111.626H84.6V112.858H79.672V113.88H83.788V115.112H79.672V116.134H85.09V117.352H80.148C80.484 118.122 80.904 118.808 81.38 119.41C82.108 119.046 82.794 118.514 83.466 117.786L84.39 118.682C83.718 119.354 82.962 119.872 82.15 120.264C83.018 121.118 84.068 121.762 85.272 122.21L84.544 123.386C81.996 122.336 80.12 120.32 78.93 117.352H78.58C78.104 118.01 77.516 118.626 76.816 119.186V121.818C77.782 121.51 78.748 121.174 79.714 120.796L79.966 122.014C78.468 122.602 76.942 123.078 75.402 123.456L74.954 122.322C75.318 122.168 75.514 121.944 75.514 121.65V120.068C74.814 120.474 74.058 120.852 73.218 121.202L72.518 120.04C74.604 119.326 76.144 118.43 77.152 117.352H72.91V116.134H78.328V115.112H74.212V113.88H78.328V112.858H73.4V111.626Z" fill="#646A73" />
            </svg>
            :
            <svg width="144" height="138" viewBox="0 0 144 138" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="143" height="137" rx="7.5" fill="#292929" />
                <rect x="0.5" y="0.5" width="143" height="137" rx="7.5" stroke="#464646" />
                <rect x="10" y="10" width="124" height="80" rx="6" fill="#373737" />
                <rect x="27" y="23" width="16" height="16" rx="2" fill="#505050" />
                <rect x="27" y="42" width="16" height="16" rx="2" fill="#505050" />
                <rect x="27" y="61" width="16" height="16" rx="2" fill="#505050" />
                <rect x="48" y="29" width="16" height="4" rx="2" fill="#8F959E" />
                <rect x="48" y="48" width="16" height="4" rx="2" fill="#8F959E" />
                <rect x="48" y="67" width="16" height="4" rx="2" fill="#8F959E" />
                <path d="M69.368 123.316H67.506L67.198 122.042C67.8 122.098 68.36 122.126 68.892 122.126C69.396 122.126 69.662 121.846 69.662 121.314V110.618H70.978V121.636C70.978 122.756 70.432 123.316 69.368 123.316ZM66.68 111.682H67.968V120.474H66.68V111.682ZM58.966 111.01H65.84V112.298H62.298C62.214 112.858 62.102 113.39 61.976 113.908H65.21V115.084C64.594 119.032 62.704 121.776 59.512 123.316L58.868 122.126C60.394 121.384 61.598 120.334 62.466 118.99C61.822 118.486 61.066 117.996 60.226 117.548C59.918 117.926 59.596 118.276 59.26 118.598L58.616 117.352C59.904 116.12 60.688 114.426 60.996 112.298H58.966V111.01ZM60.926 116.526C61.738 116.96 62.452 117.422 63.082 117.898C63.474 117.072 63.768 116.162 63.964 115.168H61.57C61.374 115.658 61.164 116.106 60.926 116.526ZM73.4 111.626H78.328V110.548H79.672V111.626H84.6V112.858H79.672V113.88H83.788V115.112H79.672V116.134H85.09V117.352H80.148C80.484 118.122 80.904 118.808 81.38 119.41C82.108 119.046 82.794 118.514 83.466 117.786L84.39 118.682C83.718 119.354 82.962 119.872 82.15 120.264C83.018 121.118 84.068 121.762 85.272 122.21L84.544 123.386C81.996 122.336 80.12 120.32 78.93 117.352H78.58C78.104 118.01 77.516 118.626 76.816 119.186V121.818C77.782 121.51 78.748 121.174 79.714 120.796L79.966 122.014C78.468 122.602 76.942 123.078 75.402 123.456L74.954 122.322C75.318 122.168 75.514 121.944 75.514 121.65V120.068C74.814 120.474 74.058 120.852 73.218 121.202L72.518 120.04C74.604 119.326 76.144 118.43 77.152 117.352H72.91V116.134H78.328V115.112H74.212V113.88H78.328V112.858H73.4V111.626Z" fill="#A6A6A6" />
            </svg>
    )
}
