import { Button } from "@chakra-ui/react";
import { Modal } from "./ui/modal";
import AdoptionForm from "./AdoptionForm";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
type AdoptionCardProps = {
  pid: number,
	nickname: string;
	name: string; // actual pokemon name
	description: string;
	status: "available" | "taken";
	mine: boolean;
	onResults: (data: any) => void;
};

export default function AdoptionCard({
  	pid,
	nickname,
	name,
	description,
	status,
	mine,
	onResults,
}: AdoptionCardProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const {userId, isAdmin} = useAuth();
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

	const adoptPokemon = async () => {
		try {
			const response = await fetch(`/api/adopt-pokemon/${pid}/${userId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({pid}),
			});

			if (!response.ok) {
				throw new Error("Failed to adopt Pokemon");
			}

			onResults({ pid, status: "taken", mine: true });
		} catch (err) {
			console.error(err);
		}
	};

	const unadoptPokemon = async () => {
		try {
			const response = await fetch(`/api/unadopt-pokemon/${pid}/${userId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({pid}),
			});

			if (!response.ok) {
				throw new Error("Failed to unadopt Pokemon");
			}

			onResults({ pid, status: "available", mine: false });
		} catch (err) {
			console.error(err);
		}
	};

	const deletePokemon = async () => {
		try {
			const response = await fetch(`/api/delete-adoptable-pokemon`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({pid}),
			});

			if (!response.ok) {
				throw new Error("Failed to delete Pokemon");
			}

			onResults({});
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
						disabled={status === "taken" && !mine}
						onClick={mine ? unadoptPokemon : () => adoptPokemon}
					>
						{mine ? "Unadopt" : status === "available" ? "Adopt Me" : "Adopted"}
					</Button>
					{isAdmin && (
					<Button
						type="button"
						className="flex ring-white bg-black/50 rounded-12 ring-1 w-32 justify-self-center mt-4"
						onClick={() => {
							setModalOpen(true);
						}}
					>
						Edit Me
					</Button>
					)}
				</div>
			</div>
			<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
				<AdoptionForm
					handleSubmit={updatePokemon}
					onClose={() => setModalOpen(false)}
					isUpdate={true}
					existingData={{ nickname, name, description }}
					onDelete={deletePokemon}
				/>
			</Modal>
		</>
	);
}
