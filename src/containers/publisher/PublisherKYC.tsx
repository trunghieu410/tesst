import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PaperclipIcon } from "@/icon/PaperclipIcon";
import { ChevronDownIcon } from "@/icon/ChevronDownIcon";
import {
  usePublisherKyc,
  useApproveKyc,
  useRejectKyc,
} from "@/lib/queries/usePublishers";

interface PublisherKYCProps {
  publisherId: string;
}

export function PublisherKYC({ publisherId }: PublisherKYCProps) {
  const [expandedDocuments, setExpandedDocuments] = useState<Set<string>>(
    new Set()
  );
  const [rejectModalOpen, setRejectModalOpen] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const { data: kycData, isLoading, error } = usePublisherKyc(publisherId);
  const approveKycMutation = useApproveKyc();
  const rejectKycMutation = useRejectKyc();

  const toggleDocument = (id: string) => {
    const newExpanded = new Set(expandedDocuments);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedDocuments(newExpanded);
  };

  const handleApprove = (submissionId: string) => {
    approveKycMutation.mutate({ publisherId, submissionId });
  };

  const handleReject = (submissionId: string) => {
    if (!rejectReason.trim()) return;
    rejectKycMutation.mutate(
      { publisherId, submissionId, reason: rejectReason },
      {
        onSuccess: () => {
          setRejectModalOpen(null);
          setRejectReason("");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <p className="text-gray-500">Loading KYC submissions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 flex items-center justify-center">
        <p className="text-red-500">Error loading KYC data</p>
      </div>
    );
  }

  const submissions = kycData?.submissions || [];

  return (
    <div className=" p-4 space-y-4 pb-4">
      {submissions.length === 0 ? (
        <div className="bg-white border-[0.5px] border-[#b5bcc4] rounded-lg p-8 text-center">
          <p className="text-gray-500">Chưa có tài liệu KYC</p>
        </div>
      ) : (
        submissions.map((doc) => {
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
                    {doc.timeAgo || doc.createdAt}
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
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setRejectModalOpen(doc.id)}
                        disabled={rejectKycMutation.isPending}
                      >
                        Từ chối KYC
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleApprove(doc.id)}
                        disabled={approveKycMutation.isPending}
                      >
                        {approveKycMutation.isPending
                          ? "Đang duyệt..."
                          : "Duyệt KYC"}
                      </Button>
                    </div>
                  )}

                  {/* Expand/Collapse Button for Approved/Rejected */}
                  {canExpand && (
                    <button
                      onClick={() => toggleDocument(doc.id)}
                      className=" w-8 h-8 p-0 cursor-pointer"
                    >
                      <ChevronDownIcon
                        classes={`w-4 h-4 text-[#021337] transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
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
                      src={doc.assets?.front || doc.frontImage}
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
                      src={doc.assets?.back || doc.backImage}
                      alt="ID Back"
                      className="w-full aspect-800/555 object-cover rounded"
                    />
                    <p className="font-normal text-sm leading-[18px] text-[#021337] mt-2">
                      Mặt sau
                    </p>
                  </div>
                </div>
              )}

              {/* Reject Modal */}
              {rejectModalOpen === doc.id && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-[400px]">
                    <h3 className="font-semibold text-lg mb-4">Từ chối KYC</h3>
                    <textarea
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      placeholder="Nhập lý do từ chối (tối đa 500 ký tự)"
                      maxLength={500}
                      className="w-full h-24 p-3 border border-[#cfd6de] rounded text-sm resize-none"
                    />
                    <div className="flex justify-end gap-3 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setRejectModalOpen(null);
                          setRejectReason("");
                        }}
                      >
                        Huỷ
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleReject(doc.id)}
                        disabled={
                          !rejectReason.trim() || rejectKycMutation.isPending
                        }
                      >
                        {rejectKycMutation.isPending
                          ? "Đang xử lý..."
                          : "Từ chối"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

