const useUserProfile = () => {

    // TICKET
type Ticket = {
    id: number;
    name: string;
    day: string;
    time: string;
    location: string;
    city: string;
    category: string;
    section: string;
    row: number;
    price: number;
    quantity: number;
    description: string;
  };
  const tickets: Ticket[] = [
    {
      id: 1,
      name: "Event 1",
      day: "Oct 12/2024",
      time: "2:00 PM",
      location: "Ziggo Dome",
      city: "Amsterdam, Netherlands",
      category: "Seat",
      section: "A",
      row: 28,
      price: 100000,
      quantity: 1,
      description: "Vé ngồi"
    },
    {
        id: 2,
        name: "Event 1",
        day: "Oct 12/2024",
        time: "2:00 PM",
        location: "Ziggo Dome",
        city: "Amsterdam, Netherlands",
        category: "Stand",
        section: "A",
        row: 0,
        price: 100000,
        quantity: 1,
        description: "Vé đứng"
    },
    {
        id: 3,
        name: "Event 2",
        day: "Nov 15/2024",
        time: "7:30 PM",
        location: "Madison Square Garden",
        city: "New York, USA",
        category: "Seat",
        section: "B",
        row: 10,
        price: 200000,
        quantity: 2,
        description: "Vé ngồi"
    },
  ];
  
  type Comment = {
    id: number;
    name: string;
    avatar: string; // URL ảnh đại diện
    rating: number;
    date: string;
    time: string;
    comment: string;
  };
  
  const comments: Comment[] = [
    {
      id: 1,
      name: "Martin Luather",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 3,
      date: "28/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 2,
      name: "John Doe",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 2,
      date: "31/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 3,
      name: "Jane Smith",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 2,
      date: "25/05/2004",
      time: "07:45 AM",
      comment:
        "It has survived not only five centuries, but also the leap into electronic typesetting.",
    },
    {
      id: 4,
      name: "Martin Luather",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 3,
      date: "28/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 5,
      name: "John Doe",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 2,
      date: "31/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
    {
      id: 6,
      name: "Jane Smith",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 2,
      date: "25/05/2004",
      time: "07:45 AM",
      comment:
        "It has survived not only five centuries, but also the leap into electronic typesetting.",
    },
    {
      id: 7,
      name: "Martin Luather",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 3,
      date: "28/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      id: 8,
      name: "John Doe",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
      rating: 2,
      date: "31/08/2004",
      time: "07:45 AM",
      comment:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
  ];

  const totalTickets = tickets.length;
  const totalReviews = comments.length;

  // Rating
  const totalRating = comments.reduce(
    (acc, comment) => acc + comment.rating,
    0
  );
  const averageRating = (totalRating / comments.length).toFixed(1); // Tính trung bình rating

  return {
    tickets,
    comments,
    totalTickets,
    totalReviews,
    averageRating,
  }
}

export default useUserProfile;