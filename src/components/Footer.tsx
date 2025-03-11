import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-8 py-5 border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                <div className="mb-3 sm:mb-0 text-center sm:text-left">
                    <p className="text-gray-600">
                        &copy; {currentYear} ImageLexicon. All rights reserved.
                    </p>
                </div>
                <div className="text-center sm:text-right">
                    <p className="text-gray-600">
                        Contact: <a
                            href="mailto:ade.naufal@gmail.com"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            ade.naufal@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;