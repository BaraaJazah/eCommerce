import React, { Suspense } from 'react'

type Props = {
    children: React.ReactNode
}
export default function SuspenseFeedBack({ children }: Props) {
    return (
        <Suspense fallback={
            <div id="wpf-loader-two">
                <div className="wpf-loader-two-inner">
                    <span>Loading</span>
                </div>
            </div>
        } >
            {children}
        </Suspense>
    )
}
