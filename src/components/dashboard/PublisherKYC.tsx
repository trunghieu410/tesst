import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PaperclipIcon } from "@/icon/PaperclipIcon";
import { ChevronDownIcon } from "@/icon/ChevronDownIcon";

interface KYCDocument {
  id: string;
  timestamp: string;
  status: "pending" | "approved" | "rejected";
  approver?: string;
  reason?: string;
  frontImage: string;
  backImage: string;
}

interface PublisherKYCProps {
  documents?: KYCDocument[];
}

// Mock KYC documents data
const defaultKYCDocuments: KYCDocument[] = [
  {
    id: "1",
    timestamp: "10.1.2025 - 8:00",
    status: "pending",
    frontImage: "https://placehold.co/800x555/ccf5e1/000000?text=Front+ID",
    backImage: "https://placehold.co/800x555/ccf5e1/000000?text=Back+ID",
  },
  {
    id: "2",
    timestamp: "10.1.2025 - 8:00",
    status: "approved",
    approver: "David Do",
    frontImage: "https://placehold.co/800x555/ccf5e1/000000?text=Front+ID",
    backImage: "https://placehold.co/800x555/ccf5e1/000000?text=Back+ID",
  },
  {
    id: "3",
    timestamp: "20.9.2025 - 8:00",
    status: "approved",
    approver: "David Do",
    frontImage: "https://placehold.co/800x555/ccf5e1/000000?text=Front+ID",
    backImage: "https://placehold.co/800x555/ccf5e1/000000?text=Back+ID",
  },
  {
    id: "4",
    timestamp: "20.9.2025 - 8:00",
    status: "rejected",
    approver: "David Do",
    reason: "Thông tin không khớp với profile hệ thống",
    frontImage: "https://placehold.co/800x555/ccf5e1/000000?text=Front+ID",
    backImage: "https://placehold.co/800x555/ccf5e1/000000?text=Back+ID",
  },
];

export function PublisherKYC({
  documents = defaultKYCDocuments,
}: PublisherKYCProps) {
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(
    new Set(["1"])
  );

  const toggleDocument = (id: string) => {
    const newExpanded = new Set(expandedDocuments);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedDocuments(newExpanded);
  };

  return (
    <div className=" p-4 space-y-4 pb-4">
      {documents.map((doc) => {
        const isExpanded = expandedDocuments.has(doc.id);
        const canExpand = doc.status !== "pending";

        return (
          <div
            key={doc.id}
            className="bg-white border-[0.5px] border-[#b5bcc4] rounded-lg overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5">
              <div className="flex items-center gap-3 mb-3">
                {/* Icon */}
                <div className="bg-[#ffd9cc] rounded-lg p-1 flex items-center justify-center">
                  <PaperclipIcon className="w-4 h-4 text-[#021337]" />
                </div>

                {/* Title */}
                <p className="font-medium text-sm leading-5 text-[#021337]">
                  Tài liệu xác thực tải lên
                </p>

                {/* Dot separator */}
                <div className="w-2 h-2 bg-[#b5bcc4] rounded-full" />

                {/* Timestamp */}
                <p className="font-normal text-sm leading-5 text-[#677187]">
                  {doc.timestamp}
                </p>

                {/* Dot separator */}
                <div className="w-2 h-2 bg-[#b5bcc4] rounded-full" />

                {/* Status Badge */}
                {doc.status === "pending" && (
                  <Badge variant="warning">Chờ duyệt</Badge>
                )}
                {doc.status === "approved" && (
                  <Badge variant="approved">Đã duyệt</Badge>
                )}
                {doc.status === "rejected" && (
                  <Badge variant="error">Từ chối</Badge>
                )}

                {/* Action Buttons for Pending */}
                {doc.status === "pending" && (
                  <div className="ml-auto flex gap-3.5">
                    <Button variant="danger" size="sm">
                      Từ chối KYC
                    </Button>
                    <Button variant="success" size="sm">
                      Duyệt KYC
                    </Button>
                  </div>
                )}

                {/* Expand/Collapse Button for Approved/Rejected */}
                {canExpand && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleDocument(doc.id)}
                    className=" w-8 h-8 p-0"
                  >
                    <ChevronDownIcon
                      classes={`w-8 h-8 text-[#021337] transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                )}
              </div>

              {/* Approver/Reason Info */}
              {doc.approver && (
                <p
                  className={`font-normal text-sm leading-[18px] ${
                    doc.status === "rejected"
                      ? "text-[#e5240c]"
                      : "text-[#021337]"
                  }`}
                >
                  bởi <span className="font-bold">{doc.approver}</span>
                  {doc.reason && `; Lí do: ${doc.reason}`}
                </p>
              )}
            </div>

            {/* ID Images - Show for pending or expanded documents */}
            {(doc.status === "pending" || isExpanded) && (
              <div className="px-4 pb-4 flex gap-4">
                {/* Front Image */}
                <div className="flex-1">
                  <img
                    src={doc.frontImage}
                    alt="ID Front"
                    className="w-full aspect-800/555 object-cover rounded"
                  />
                  <p className="font-normal text-sm leading-[18px] text-[#021337] mt-2">
                    Mặt trước
                  </p>
                </div>

                {/* Back Image */}
                <div className="flex-1">
                  <img
                    src={doc.backImage}
                    alt="ID Back"
                    className="w-full aspect-800/555 object-cover rounded"
                  />
                  <p className="font-normal text-sm leading-[18px] text-[#021337] mt-2">
                    Mặt sau
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
