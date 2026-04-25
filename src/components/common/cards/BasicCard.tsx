import Image from "next/image";

export interface BasicCardProps {
    image?: string;
    className?: string;
    imageClassName?: string;
    badge?: React.ReactNode;
    action?: React.ReactNode;
    children?: React.ReactNode;
    priority?: boolean;
}

export default function BasicCard({ image, className, imageClassName, badge, action, children, priority }: BasicCardProps) {
    return (
        <div className={`relative flex flex-col justify-start rounded-[14px] overflow-hidden border-light-gray border-2 ${className ?? ''}`}>
            {badge && (
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-y-2">
                    {badge}
                </div>
            )}
            {action && (
                <div className="absolute top-3 right-3 z-10">
                    {action}
                </div>
            )}
            <Image
                src={image ?? '/images/image-product-dummy.jpg'}
                alt="image card"
                width={300}
                height={300}
                style={{ width: '100%', height: 'auto' }}
                className={`object-contain ${imageClassName ?? ''}`}
                priority={priority}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {children}
        </div>
    )
}
