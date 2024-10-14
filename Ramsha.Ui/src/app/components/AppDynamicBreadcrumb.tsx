import { useLocation } from 'react-router-dom';
import Breadcrumb from './AppBreadcrumb'; // Import your reusable Breadcrumb component

const DynamicBreadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);


    const generateLabel = (segment: string, index: number): string => {

        const isId = /^[a-f0-9]{24}$/.test(segment);
        if (isId) {
            return 'Details';
        }

        return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    };

    const breadcrumbItems = pathnames.map((segment, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;

        return {
            label: generateLabel(segment, index),
            path: index === pathnames.length - 1 ? undefined : path,
        };
    });

    return <Breadcrumb items={breadcrumbItems} />;
};

export default DynamicBreadcrumb;
