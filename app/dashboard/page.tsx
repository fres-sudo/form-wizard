import { GetFormStats, GetForms } from "@/actions/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsFileEarmarkPlus } from "react-icons/bs";

export default function Home() {
	return (
		<div className="container pt-4">
			<Suspense fallback={<StatsCards loading={true} />}>
				<CardStatsWrapper />
			</Suspense>
			<Separator className="my-6" />
			<h2 className="text-4xl font-bold col-span-2">Your Forms</h2>
			<Separator className="my-6" />
			<div className="grid grid-cols-1 md:drig-cols-2 lg:grid-cols-3 gap-6">
				<CreateFormBtn>
					<Button
						variant={"outline"}
						className="group border border-primary/20 h-[190px] 
        items-center justify-center flex flex-col hover:border-primary 
        hover:cursor-pointer border-dashed gap-4 ">
						<BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
						<p className="font-bold text-xl text-mudet-foregrounf group-hover:text-primary">
							Create new forms
						</p>
					</Button>
				</CreateFormBtn>
				<Suspense
					fallback={[1, 2, 3, 4].map((el) => (
						<FormCardSkeleton key={el} />
					))}>
					<FormCards />
				</Suspense>
			</div>
		</div>
	);
}

async function CardStatsWrapper() {
	const stats = await GetFormStats();
	return (
		<StatsCards
			loading={false}
			data={stats}
		/>
	);
}

interface StatsCardProps {
	data?: Awaited<ReturnType<typeof GetFormStats>>;
	loading: boolean;
}

export function StatsCards(props: StatsCardProps) {
	const { data, loading } = props;

	return (
		<div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
			<StatsCard
				title="Total visits"
				icon={<LuView className="text-primary" />}
				helperText="All time form visits"
				value={data?.visits.toLocaleString() || ""}
				loading={loading}
				className="shad-mg"
			/>
			<StatsCard
				title="Total submissions"
				icon={<FaWpforms className="text-primary" />}
				helperText="All time form submissions"
				value={data?.submissions.toLocaleString() || ""}
				loading={loading}
				className="shad-mg"
			/>
			<StatsCard
				title="Submission rate"
				icon={<HiCursorClick className="text-primary" />}
				helperText="Visits that result in form submissions"
				value={data?.submissionRate.toLocaleString() + "%" || ""}
				loading={loading}
				className="shad-mg"
			/>
			<StatsCard
				title="Buonce rate"
				icon={<TbArrowBounce className="text-primary" />}
				helperText="Visits that leavs without interacting"
				value={data?.bounceRate.toLocaleString() + "%" || ""}
				loading={loading}
				className="shad-mg"
			/>
		</div>
	);
}

export function StatsCard({
	title,
	value,
	icon,
	helperText,
	loading,
	className,
}: {
	title: string;
	value: string;
	helperText: string;
	className: string;
	loading: boolean;
	icon: ReactNode;
}) {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{loading && (
						<Skeleton>
							<span className="opacity-0">0</span>
						</Skeleton>
					)}
					{!loading && value}
				</div>
				<p className="text-xs text-muted-foreground pt-1">{helperText}</p>
			</CardContent>
		</Card>
	);
}

function FormCardSkeleton() {
	return <Skeleton className="broder-2 border-primary-/20 h-[190px] w-full" />;
}

async function FormCards() {
	const forms = await GetForms();
	return (
		<>
			{forms.map((form) => (
				<FormCard
					key={form.id}
					form={form}
					disable={false}
				/>
			))}
		</>
	);
}

export function FormCard({
	form,
	disable = false,
}: {
	form: Form;
	disable: boolean;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 justify-between">
					<span className="trucate font-bold">{form.name}</span>
					{form.published && <Badge>Published</Badge>}
					{!form.published && <Badge variant={"destructive"}>Draft</Badge>}
				</CardTitle>
				<CardDescription className="flex items-center justify-between text-muted-foreground text-">
					{formatDistance(form.createdAt, new Date(), { addSuffix: true })}
					{form.published && (
						<span className="flex items-center gap-2">
							<LuView className="text-muted-foreground" />
							<span>{form.visit.toLocaleString()}</span>
							<FaWpforms className="text-muted-foreground" />
							<span>{form.submission.toLocaleString()}</span>
						</span>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent className="h-[20px] truncate text-sm text-muted-foreground">
				{form.description || "No description"}
			</CardContent>
			<CardFooter>
				{disable && (
					<Button className="w-full mt-2 text-md gap-4">
						View submissions
					</Button>
				)}
				{!disable && ( // Only render the other buttons if disable is false
					<>
						{form.published && (
							<Button
								asChild
								className="w-full mt-2 text-md gap-4">
								<Link href={`/dashboard/forms/${form.id}`}>
									View submissions <BiRightArrowAlt />
								</Link>
							</Button>
						)}
						{!form.published && (
							<Button
								asChild
								variant={"secondary"}
								className="w-full mt-2 text-md gap-4">
								<Link href={`/dashboard/builder/${form.id}`}>
									Edit form <FaEdit />
								</Link>
							</Button>
						)}
					</>
				)}
			</CardFooter>
		</Card>
	);
}
