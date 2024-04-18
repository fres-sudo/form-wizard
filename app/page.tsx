"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";
import CreateFormBtn from "@/components/CreateFormBtn";
import OpenLink from "@/components/OpenLink";
import { useRouter } from "next/router";
import Link from "next/link";
import { BentoGrid, BentoGridItem } from "./../components/ui/bento-grids";
import {
	IconClipboardCopy,
	IconFileBroken,
	IconSignature,
	IconTableColumn,
} from "@tabler/icons-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "./../components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import SidebarBtnElement from "@/components/SidebarBtnElement";
import { FormElements } from "@/components/FormElements";
import { FormCard, StatsCard } from "./dashboard/page";
import { TbArrowBounce } from "react-icons/tb";
import { FaWpforms } from "react-icons/fa";
import { DialogOverlay } from "@radix-ui/react-dialog";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { format } from "date-fns";
import { DateFieldFormElement } from "@/components/fields/DateField";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

function LandPage() {
	const defaultValue = new Date();

	const [date, setDate] = useState<Date | undefined>(
		defaultValue ? new Date(defaultValue) : undefined
	);
	// Generate mock data for the Form model
	const generateMockForms = () => {
		const mockForms = [];
		const numForms = 1;

		for (let i = 1; i <= numForms; i++) {
			const form = {
				id: i,
				userId: `user_${i}`,
				createdAt: new Date(), // Use current date
				published: true,
				name: `Form ${i}`,
				description: `Description for Form ${i}`,
				content: JSON.stringify([]),
				visit: Math.floor(Math.random() * 100),
				submission: Math.floor(Math.random() * 50),
				sharedUrl: `uuid_${i}`,
				FormSubmissions: [],
			};

			mockForms.push(form);
		}

		return mockForms;
	};

	const mockForms = generateMockForms();

	const formCards = mockForms.map((form, index) => (
		<FormCard
			key={index}
			form={form}
			disable={true}
		/>
	));

	const items1 = [
		{
			title: "Intuitive dashboard",
			description: "Take everything under control with beautyful dashboard.",
			header: <div>{formCards}</div>,
			className: "md:col-span-2",
			icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
		},
		{
			title: "Drag and Drop Form Building",
			description: "Explore easy usability of Drag and Drop form creation.",
			header: (
				<div className="flex flex-col m-2 items-center justify-between gap-y-2">
					<SidebarBtnElement formElement={FormElements.TitleField} />
				</div>
			),
			className: "md:col-span-1",
			icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
		},
	];
	const items2 = [
		{
			title: "Clean UI/UX",
			description: "Enjoy the experience with clean UI/UX.",
			header: (
				<div className="flex flex-col">
					<p className="text-xl font-bold">Title Field</p>
					<p className="text-lg">Subtitle Field</p>
					<p className="">Paragraph Field</p>
					<Separator className="my-3" />
					<div className="flex flex-col gap-2 w-full">
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className="w-full justify-start text-left fotn-normale font-xl">
									<CalendarIcon className="mr-2 h-4 w-4 font-sm" />
									{date ? format(date, "PPP") : <span>Pick a date</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent
								className="w-auto p-0"
								align="start">
								<Calendar
									mode="single"
									selected={date}
									onSelect={(date) => {
										setDate(date);
										const value = date?.toUTCString() || "";
									}}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>
					<Separator className="my-3" />
					<div className="flex items-stop space-x-2">
						<Checkbox />
						<div className="grid gap-1.5 leading-none">
							<Label>Checkbox</Label>

							<p className="text-muted-foreground text-[0.8rem]">Helper Text</p>
						</div>
					</div>
					<Separator className="my-3" />
					<div className="flex flex-col gap-2 w-full">
						<Label>Label</Label>
						<Select>
							<SelectTrigger className="w-full">
								<SelectValue placeholder={"Selector"} />
							</SelectTrigger>
						</Select>
					</div>
				</div>
			),
			className: "md:col-span-1",
			icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
		},
		{
			title: "Complete forms statistics and reports",
			description:
				"Understand the impact of your forms, how and when people use your form.",
			header: (
				<div className=" items-center flex-col grid grid-rows-1 gap-y-2">
					<StatsCard
						title="Buonce rate"
						icon={<TbArrowBounce className="text-primary" />}
						helperText="Visits that leavs without interacting"
						value={"10%"}
						loading={false}
						className="shad-mg"
					/>
					<StatsCard
						title="Total submissions"
						icon={<FaWpforms className="text-primary" />}
						helperText="All time form submissions"
						value={"9432"}
						loading={false}
						className="shad-mg"
					/>
				</div>
			),
			className: "md:col-span-2",
			icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
		},
	];

	const testimonials = [
		{
			quote:
				"FormWizard has been an invaluable tool for our team. Its intuitive interface and efficient features have greatly streamlined our workflow",
			name: "Alex Johnson",
			title: "Highly Recommended!",
		},
		{
			quote:
				"FormWizard has become an essential part of our operations. It's reliable, efficient, and has helped us save a significant amount of time.",
			name: "Chris Williams",
			title: "Great Addition to Our Toolkit!",
		},
		{
			quote:
				"FormWizard is a fantastic platform for form creation and management. It's intuitive, customizable, and has simplified our processes immensely.",
			name: "Jennifer Martinez",
			title: "Fantastic Platform!",
		},
		{
			quote:
				"We've had a positive experience with FormWizard. Not only is the platform great, but the support team is also very responsive and helpful.",
			name: "Matthew Brown",
			title: "Excellent Support!",
		},
		{
			quote:
				"We've been using FormWizard for a while now, and it has exceeded our expectations. It's user-friendly and has made form handling much easier for us.",
			name: "Herman Melville",
			title: "Impressive Solution",
		},
	];

	return (
		<div className="flex flex-col 2xl:flex-row h-screen items-center pl-2 sm:pl-12 bg-dot-thick-neutral-100 dark:bg-dot-thick-neutral-800">
			<div className="flex flex-col items-start mt-24">
				<HeroHighlight>
					<motion.h1
						initial={{
							opacity: 0,
							y: 20,
						}}
						animate={{
							opacity: 1,
							y: [20, -5, 0],
						}}
						transition={{
							duration: 0.5,
							ease: [0.4, 0.0, 0.2, 1],
						}}
						className="px-4 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white leading-relaxed lg:leading-snug items-start text-start mx-auto ">
						Form handling like magic, <br />
						<Highlight className="text-black dark:text-white">
							as if under a mystical spell 🧙🏻
						</Highlight>
						<br />
						Unlock the enchantment with Form
						<span className="text-blue-500">Wizard</span>
					</motion.h1>
				</HeroHighlight>
				<div className="flex items-end mt-4 sm:mt-10 pl-4 gap-4">
					<OpenLink />
					<Button asChild>
						<Link href={`/dashboard`}>Start Creating</Link>
					</Button>
				</div>
				<div className="mt-4 sm:mt-10 rounded-md antialiased items-center justify-center relative overflow-hidden">
					<InfiniteMovingCards
						items={testimonials}
						direction="right"
						speed="slow"
					/>
				</div>
			</div>
			<div className="flex-col mx-auto max-w-4xl">
				<BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] pl-8 pr-8 pt-8 sm:pr-12 ">
					{items1.map((item, i) => (
						<BentoGridItem
							key={i}
							title={item.title}
							description={item.description}
							header={item.header}
							className={item.className}
							icon={item.icon}
						/>
					))}
				</BentoGrid>
				<BentoGrid className="max-w-4xl mx-auto md:auto-rows-[27rem] pt-4 pl-8 pr-8 pb-8 sm:pr-12">
					{items2.map((item, i) => (
						<BentoGridItem
							key={i}
							title={item.title}
							description={item.description}
							header={item.header}
							className={item.className}
							icon={item.icon}
						/>
					))}
				</BentoGrid>
			</div>
		</div>
	);
}

export default LandPage;
