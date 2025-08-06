import React from 'react';
import {
    HiOutlineHome, HiMagnifyingGlass, HiOutlineDocumentText, HiOutlineUser, HiOutlineUsers, HiOutlineChartBar, HiOutlineCog6Tooth,
    HiOutlineQuestionMarkCircle, HiOutlineCheckCircle, HiOutlineClock, HiOutlineBuildingOffice2, HiOutlineDocument, HiOutlineBell,
    HiOutlineArrowUpTray, HiChevronLeft, HiChevronRight, HiOutlineSparkles, HiOutlinePaperAirplane, HiXMark, HiChevronDown,
    HiOutlineUserCircle, HiOutlineCpuChip, HiOutlineArrowDownTray, HiOutlineTrash, HiOutlineMapPin, HiOutlineUserPlus,
    HiOutlineChatBubbleOvalLeftEllipsis, HiOutlineCalendarDays, HiOutlineArrowLeftOnRectangle, HiOutlineArrowRightOnRectangle,
    HiOutlineArchiveBox, HiOutlineEnvelope, HiCheckBadge, HiOutlineCreditCard, HiOutlineArrowTrendingUp, HiPlus, HiOutlineArrowLeft,
    HiOutlineGlobeAlt
} from 'react-icons/hi2';
import { BsFiletypePdf, BsFiletypeDocx } from 'react-icons/bs';

type IconProps = {
  className?: string;
};

// Re-exporting from react-icons
export const HomeIcon = HiOutlineHome;
export const SearchIcon = HiMagnifyingGlass;
export const FileContractIcon = HiOutlineDocumentText;
export const UserTieIcon = HiOutlineUser;
export const UsersIcon = HiOutlineUsers;
export const ChartLineIcon = HiOutlineChartBar;
export const CogIcon = HiOutlineCog6Tooth;
export const QuestionCircleIcon = HiOutlineQuestionMarkCircle;
export const CheckCircleIcon = HiOutlineCheckCircle;
export const ClockIcon = HiOutlineClock;
export const BuildingIcon = HiOutlineBuildingOffice2;
export const FileAltIcon = HiOutlineDocument;
export const BellIcon = HiOutlineBell;
export const FileUploadIcon = HiOutlineArrowUpTray;
export const ChevronLeftIcon = HiChevronLeft;
export const ChevronRightIcon = HiChevronRight;
export const SparklesIcon = HiOutlineSparkles;
export const PaperAirplaneIcon = HiOutlinePaperAirplane;
export const CloseIcon = HiXMark;
export const ChevronDownIcon = HiChevronDown;
export const FilePdfIcon = BsFiletypePdf;
export const FileWordIcon = BsFiletypeDocx;
export const UserCircleIcon = HiOutlineUserCircle;
export const BotIcon = HiOutlineCpuChip;
export const DownloadIcon = HiOutlineArrowDownTray;
export const TrashIcon = HiOutlineTrash;
export const MapPinIcon = HiOutlineMapPin;
export const UserCheckIcon = HiOutlineUserPlus;
export const CommentDotsIcon = HiOutlineChatBubbleOvalLeftEllipsis;
export const CalendarAltIcon = HiOutlineCalendarDays;
export const LogoutIcon = HiOutlineArrowLeftOnRectangle;
export const LoginIcon = HiOutlineArrowRightOnRectangle;
export const FileArchiveIcon = HiOutlineArchiveBox;
export const MailIcon = HiOutlineEnvelope;
export const BadgeCheckIcon = HiCheckBadge;
export const BillingIcon = HiOutlineCreditCard;
export const TrendingUpIcon = HiOutlineArrowTrendingUp;
export const PlusIcon = HiPlus;
export const ArrowLeftIcon = HiOutlineArrowLeft;
export const GlobeIcon = HiOutlineGlobeAlt;

// Custom Logo Icon remains as SVG
export const LogoIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="8" fill="currentColor"/>
        <path d="M8 10.2857L8 20H11.2L11.2 14.5714C11.2 12.8757 12.04 12.0286 13.76 12.0286C15.48 12.0286 16.24 12.8757 16.24 14.5714L16.24 20H19.44L19.44 10.2857H16.24L16.24 11.6C15.48 10.5143 14.48 10 12.88 10C10.24 10 8 11.3143 8 14.2857" fill="white"/>
    </svg>
);