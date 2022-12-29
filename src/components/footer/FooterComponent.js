import React from 'react'

export default function FooterComponent() {
    return (
        <footer className="bg-white border-t border-gray-400 shadow">
            <div className="container max-w-md mx-auto flex py-2">
                <div className="w-full mx-auto flex flex-wrap">
                    <div className="flex w-full md:w-1/2 ">
                        <div className="px-8">
                            <p className="text-gray-900">About</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
