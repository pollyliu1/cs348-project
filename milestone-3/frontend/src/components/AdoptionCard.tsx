import { Button } from "@chakra-ui/react";
import { Modal } from "./ui/modal";
import AdoptionForm from "./AdoptionForm";
import { useState } from "react";
type AdoptionCardProps = {
  pid: number,
	nickname: string;
	name: string; // actual pokemon name
	description: string;
	status: "available" | "taken";
	onResults: (data: any) => void;
};

export default function AdoptionCard({
  pid,
	nickname,
	name,
	description,
	status,
	onResults,
}: AdoptionCardProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const updatePokemon = async (
		data: {
			nickname: string;
			name: string;
			description: string;
		}
	) => {
		// api call to update pokemon details
		try {
			const response = await fetch(`/api/update-pokemon/${encodeURIComponent(pid)}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to update Pokemon details");
			}

			onResults({pid, nickname: data.nickname, name: data.name, description: data.description });
		} catch (err) {
			console.error(err);
		}
	};

	const adoptPokemon = async (data: { pid: number }) => {
		try {
			const response = await fetch(`/api/adopt-pokemon/${pid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Failed to update Pokemon details");
			}

			onResults({ pid, status: "taken" });
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div className="ring-white ring-1 rounded-2 col-span-1 p-8 shadow-md flex flex-col justify-center">
				<h2 className="text-2xl font-semibold">{nickname}</h2>
				<p className="mb-2 text-lg text-gray-200">{name}</p>
				<p className="mb-4">{description}</p>
				<div className="flex gap-4 justify-end">
					<Button
						type="button"
						className="flex ring-white ring-1 w-32 rounded-12 justify-self-center mt-4"
						disabled={status === "taken"}
						onClick={() => adoptPokemon({ pid })}
					>
						{status === "available" ? "Adopt Me" : "Adopted"}
					</Button>
					<Button
						type="button"
						className="flex ring-white bg-black/50 rounded-12 ring-1 w-32 justify-self-center mt-4"
						onClick={() => {
							setModalOpen(true);
						}}
					>
						Edit Me
					</Button>
				</div>
			</div>
			<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
				<AdoptionForm
					handleSubmit={updatePokemon}
					onClose={() => setModalOpen(false)}
					isUpdate
					existingData={{ nickname, name, description }}
				/>
			</Modal>
		</>
	);
}
