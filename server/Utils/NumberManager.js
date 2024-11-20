import crypto from "crypto";

// Model
import Ticket from "../Model/Ticket.model.js";

export const generateUniqueTicketNo = async () => {
  let isUnique = false;
  let ticketNo;

  while (!isUnique) {
    // Generate a random 4-digit number (0000 to 9999)
    ticketNo = crypto.randomInt(0, 10000).toString().padStart(4, "0");

    // Check if the ticket already exists in the database
    const existingTicket = await Ticket.findOne({ ticketNo });
    if (!existingTicket) {
      isUnique = true; // Set flag if the ticket is unique
    }
  }

  return ticketNo;
};

export const getTicketById = async (ticketId) => {
  const ticket = await Ticket.findById(ticketId);

  return ticket ? ticket.ticketNo : null;
};

export const generateTicketsForContest = async (
  user,
  contest,
  totalTickets
) => {
  const ticketIds = [];

  for (let i = 0; i < totalTickets; i++) {
    const ticketNo = await generateUniqueTicketNo();

    const ticket = await Ticket.create({
      contestId: contest._id,
      userId: user._id,
      ticketNo,
    });

    ticketIds.push(ticket._id);
  }

  return ticketIds;
};
