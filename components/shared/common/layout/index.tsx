import React from 'react';
import Head from 'next/head';
import Header from '@components/shared/common/header';

interface CommonLayoutProps {
    children: React.ReactNode;
    title?: string;
}

const BuyerLayout: React.FC<CommonLayoutProps> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title ? `${title} - FashionHub` : ''}</title>
            </Head>
            <Header />
            <div className="">{children}</div>
        </>
    );
};

export default React.memo(BuyerLayout);
