import React, { ReactNode } from "react";
import { GetFormById, GetFormWithSubmissions } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";
import VisitBtn from "@/components/VisitBtn";
import FormLinkShare from "@/components/FormLinkShare";
import { StatsCard } from "../../dashboard/page";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { TbArrowBounce } from "react-icons/tb";
import { HiCursorClick } from "react-icons/hi";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

async function FormDetailPage({ params }: { params: { id: string } }) {
	const { id } = params;
	const form = await GetFormById(Number(id));

	if (!form) {
		throw new Error("Form not found");
	}
	const { visit, submission } = form;

	let submissionRate = 0;

	if (visit > 0) {
		submissionRate = (submission / visit) * 100;
	}

	const bounceRate = 100 - submissionRate;

	return (
		<>
			<div className="py-10 border-b border-muted">
				<div className="flex justify-between container">
					<h1 className="text-4xl font-bold truncate">{form.name}</h1>
					<VisitBtn sharedUrl={form.sharedUrl} />
				</div>
			</div>
			<div className="py-4 border-b border-muted">
				<div className="container flex gap-2 items-center justify-between">
					<div className="container flex gap-2 items-center justify-between">
						<FormLinkShare sharedUrl={form.sharedUrl} />
					</div>
				</div>
			</div>
			<div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
				<StatsCard
					title="Total visits"
					icon={<LuView className="text-primary" />}
					helperText="All time form visits"
					value={visit.toLocaleString() || ""}
					loading={false}
					className="shad-m"
				/>
				<StatsCard
					title="Total submissions"
					icon={<FaWpforms className="text-primary" />}
					helperText="All time form submissions"
					value={submission.toLocaleString() || ""}
					loading={false}
					className="shad-mg"
				/>
				<StatsCard
					title="Submission rate"
					icon={<HiCursorClick className="text-primary" />}
					helperText="Visits that result in form submissions"
					value={submissionRate.toLocaleString() + "%" || ""}
					loading={false}
					className="shad-mg"
				/>
				<StatsCard
					title="Buonce rate"
					icon={<TbArrowBounce className="text-primary" />}
					helperText="Visits that leavs without interacting"
					value={bounceRate.toLocaleString() + "%" || ""}
					loading={false}
					className="shad-mg"
				/>
			</div>

			<div className="container pt-10 ">
				<SumbissionTable id={form.id} />
			</div>
		</>
	);
}

export default FormDetailPage;

type Row = { [key: string]: string } & { submittedAt: Date };

async function SumbissionTable({ id }: { id: number }) {
	const form = await GetFormWithSubmissions(id);

	if (!form) {
		throw new Error("Form not found");
	}

	const formElements = JSON.parse(form.content) as FormElementInstance[];

	const columns: {
		id: string;
		label: string;
		required: boolean;
		type: ElementsType;
	}[] = [];

	formElements.forEach((element) => {
		switch (element.type) {
			case "NumberField":
			case "DateField":
			case "TextAreaField":
			case "CheckboxField":
			case "SelectField":
			case "TextField":
				columns.push({
					id: element.id,
					label: element.extraAttributes?.label,
					required: element.extraAttributes?.required,
					type: element.type,
				});
				break;
			default:
				break;
		}
	});

	const rows: Row[] = [];
	form.FormSubmissions.forEach((submissions) => {
		const content = JSON.parse(submissions.content);
		rows.push({
			...content,
			submittedAt: submissions.createdAt,
		});
	});

	return (
		<>
			<h1 className="text-2xl font-bold my-4">Sumbissions</h1>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<>
									<TableHead
										key={column.id}
										className="uppercase">
										{column.label}
									</TableHead>
									<TableHead className="text-muted-foreground text-right uppercase">
										Submitted at
									</TableHead>
								</>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index}>
								{columns.map((columns) => (
									<RowCell
										key={columns.id}
										type={columns.type}
										value={row[columns.id]}
									/>
								))}
								<TableCell className="text-muted-foreground text-right">
									{formatDistance(row.submittedAt, new Date(), {
										addSuffix: true,
									})}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

function RowCell({ type, value }: { type: ElementsType; value: string }) {
	let node: ReactNode = value;

	switch (type) {
		case "DateField":
			if (!value) break;
			const date = new Date(value);
			node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
			break;
		case "CheckboxField":
			const checked = value === "true";
			node = (
				<Checkbox
					checked={checked}
					disabled
				/>
			);
	}

	return <TableCell>{node}</TableCell>;
}
